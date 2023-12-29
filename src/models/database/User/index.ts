import { Firestore } from '../../../services/Firestore';
import { Auth } from '../../../services/Auth';
import {
  DocumentReference,
  QueryDocumentSnapshot,
  DocumentSnapshot,
  Transaction,
  WriteResult,
} from '../FirestoreTypes';

export class UserModel {
  constructor({
    id,
    email,
    fcmToken = '',
  }: {
    id?: string;
    email: string;
    fcmToken?: string;
  }) {
    this.id = id;
    this.email = email;
    this.fcmToken = fcmToken;
  }

  id?: string;

  email: string;

  fcmToken?: string;

  static fromJson(id: string, json: { [key: string]: any }): UserModel {
    return new UserModel({
      id: id,
      email: typeof json?.email === 'string' ? json.email : '',
      fcmToken: typeof json?.fcmToken === 'string' ? json.fcmToken : '',
    });
  }

  toJson(): { [key: string]: any } {
    return {
      email: this.email,
      fcmToken: this.fcmToken,
    };
  }

  static parent = Firestore.collection('users').withConverter<UserModel>({
    toFirestore: (doc: UserModel) => doc.toJson(),
    fromFirestore: (snapshot: QueryDocumentSnapshot) =>
      UserModel.fromJson(snapshot.id, snapshot.data()),
  });

  static withId = (id: string): Promise<DocumentSnapshot<UserModel>> =>
    UserModel.parent.doc(id).get();

  ref = (): DocumentReference<UserModel> => {
    if (typeof this.id === 'string')
      return UserModel.parent.doc(this.id);
    const docRef = UserModel.parent.doc();
    this.id = docRef.id;
    return docRef;
  };

  load = (transaction?: Transaction): Promise<DocumentSnapshot<UserModel>> =>
    transaction instanceof Transaction
      ? transaction.get(this.ref())
      : this.ref().get();

  save = async (
    transaction?: Transaction
  ): Promise<WriteResult | Transaction> => {
    const ref = this.ref();
    if (typeof this.id === 'string') {
      await Auth.updateUser(ref.id, { email: this.email }).catch(
        async (e: any) => {
          if (e?.code === 'auth/user-not-found')
            return Auth.createUser({
              uid: ref.id,
              email: this.email,
            });
          return Promise.reject(e);
        }
      );
    } else {
      await Auth.createUser({ uid: ref.id, email: this.email });
    }
    return transaction instanceof Transaction
      ? Promise.resolve(transaction.set(ref, this))
      : ref.set(this);
  };

  child = {
    // Example:
    // getSubscriptions: (): Query<SubscriptionModel> =>
    //   SubscriptionModel.parent.where('user', '==', this.ref()),
  };
}
