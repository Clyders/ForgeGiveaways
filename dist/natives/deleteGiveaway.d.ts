import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Boolean;
}], true>;
export default _default;
