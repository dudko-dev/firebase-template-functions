import { CallableRequest } from '../../services/FirebaseFunctionsV2';
import '../../initialization';
import { CallableDataValidator } from '../../models/types/CallableData/validator';
import { CallableDataInterface } from '../../models/types/CallableData/interface';
import { OnCallFunError } from '../../utils/classes/OnCallFunError';
import { onCallFunErrorHandler } from '../../utils/onCallFunErrorHandler';
import { OnCallFunLogger } from '../../utils/classes/OnCallFunLogger';
import actions from './actions';

export async function handler(callableRequest: CallableRequest) {
  new OnCallFunLogger(callableRequest);
  try {
    if (!CallableDataValidator(callableRequest.data))
      throw new OnCallFunError(
        '#000002',
        CallableDataValidator.errors
          ? JSON.stringify(CallableDataValidator.errors)
          : ''
      );
    const validatedData = callableRequest.data as CallableDataInterface;
    if (!(actions as { [key: string]: any })[validatedData.action])
      throw new OnCallFunError('#000003');
    const action: keyof typeof actions = validatedData.action as any;
    return await actions[action](validatedData.data, callableRequest);
  } catch (err) {
    return await onCallFunErrorHandler(err as any);
  }
}
