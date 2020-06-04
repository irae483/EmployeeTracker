let obj: any = null;

export function throwNull2NonNull(field: string, d: any): never {
    return errorHelper(field, d, "non-nullable object", false);
  }
  export function throwNotObject(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, "object", nullable);
  }
  export function throwIsArray(field: string, d: any, nullable: boolean): never {
    return errorHelper(field, d, "object", nullable);
  }
  export function checkArray(d: any, field: string): void {
    if (!Array.isArray(d) && d !== null && d !== undefined) {
      errorHelper(field, d, "array", true);
    }
  }
  export function checkNumber(d: any, nullable: boolean, field: string): void {
    if (typeof(d) !== 'number' && (!nullable || (nullable && d !== null && d !== undefined))) {
      errorHelper(field, d, "number", nullable);
    }
  }
  export function checkBoolean(d: any, nullable: boolean, field: string): void {
    if (typeof(d) !== 'boolean' && (!nullable || (nullable && d !== null && d !== undefined))) {
      errorHelper(field, d, "boolean", nullable);
    }
  }
  export  function checkString(d: any, nullable: boolean, field: string): void {
    if (typeof(d) !== 'string' && (!nullable || (nullable && d !== null && d !== undefined))) {
      errorHelper(field, d, "string", nullable);
    }
  }
  export  function checkNull(d: any, field: string): void {
    if (d !== null && d !== undefined) {
      errorHelper(field, d, "null or undefined", false);
    }
  }
  export function errorHelper(field: string, d: any, type: string, nullable: boolean): never {
    if (nullable) {
      type += ", null, or undefined";
    }
    throw new TypeError('Expected ' + type + " at " + field + " but found:\n" + JSON.stringify(d) + "\n\nFull object:\n" + JSON.stringify(obj));
  }
  