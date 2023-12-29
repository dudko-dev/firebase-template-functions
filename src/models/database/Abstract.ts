import {
  DocumentReference,
  CollectionReference,
  Transaction,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from './FirestoreTypes';
import { Firestore } from '../../services/Firestore';

/**
 * Abstract data model's class
 *
 */
export class Abstract {
  constructor({
    id,
    collRef,
  }: {
    /**
     * firestore document's id
     */
    id?: string;
    /**
     * parent collection's reference of the document
     */
    collRef: CollectionReference;
  }) {
    this.parent = collRef;
    this.ref =
      typeof id === 'string'
        ? this.parent.doc(id.replace(/\//g, ''))
        : this.parent.doc();
  }

  /**
   * parent collection's reference in the firestore
   */
  public parent: CollectionReference;

  /**
   * model's reference in the firestore
   */
  public ref: DocumentReference;

  /**
   * Model data
   * it can be loaded from the firestore by the load method
   * and saved by the save method
   */
  public data?: DocumentData;

  /**
   * model's converter
   */
  public converter: FirestoreDataConverter<DocumentData> = {
    toFirestore(doc: DocumentData): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): DocumentData {
      const doc = snapshot.data()!;
      return doc;
    },
  };

  /**
   * Load data from firestore to the data property
   *
   * @param transaction - firestore transaction
   * @returns
   */
  public load = async (transaction?: Transaction) => {
    const doc = await this.get(transaction);
    this.data = doc;
    return true;
  };

  /**
   * Save data to firestore from the data property
   *
   * @param transaction - firestore transaction
   * @returns
   */
  public save = async (transaction?: Transaction) => {
    if (!this.data) return false;
    await this.set(this.data, transaction);
    return true;
  };

  /**
   * Read data
   *
   * @param transaction - firestore transaction
   * @returns
   */
  public get = async (transaction?: Transaction) => {
    const snap = transaction
      ? await transaction.get(this.ref.withConverter(this.converter))
      : await this.ref.withConverter(this.converter).get();
    const doc = snap.exists ? snap.data() : undefined;
    return doc;
  };

  /**
   * Write data
   *
   * @param data - document data
   * @param transaction - firestore transaction
   * @returns
   */
  public set = async (data: DocumentData, transaction?: Transaction) =>
    transaction
      ? transaction.set(this.ref.withConverter(this.converter), data)
      : this.ref.withConverter(this.converter).set(data);

  /**
   * Update data
   *
   * @param data - document data
   * @param transaction - firestore transaction
   * @returns
   */
  public update = async (data: DocumentData, transaction?: Transaction) =>
    transaction
      ? transaction.update(this.ref.withConverter(this.converter), data)
      : this.ref.withConverter(this.converter).update(data);

  /**
   * Remove data
   *
   * @param transaction - firestore transaction
   * @returns
   */
  public delete = async (transaction?: Transaction) =>
    transaction
      ? transaction.delete(this.ref, {
        exists: true,
      })
      : this.ref.delete({ exists: true });

  /**
   * Collection reference with converter
   *
   * @returns
   */
  public col = () => this.parent.withConverter(this.converter);

  /**
   * Get model from string path
   *
   * @returns
   */
  public static fromPath = (path: string) => {
    const d = Firestore.doc(path);
    return new Abstract({ id: d.id, collRef: d.parent });
  };
}
