
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RunningRecord
 * 
 */
export type RunningRecord = $Result.DefaultSelection<Prisma.$RunningRecordPayload>
/**
 * Model TrainingPlan
 * 
 */
export type TrainingPlan = $Result.DefaultSelection<Prisma.$TrainingPlanPayload>
/**
 * Model TrainingPlanItem
 * 
 */
export type TrainingPlanItem = $Result.DefaultSelection<Prisma.$TrainingPlanItemPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.runningRecord`: Exposes CRUD operations for the **RunningRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RunningRecords
    * const runningRecords = await prisma.runningRecord.findMany()
    * ```
    */
  get runningRecord(): Prisma.RunningRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingPlan`: Exposes CRUD operations for the **TrainingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingPlans
    * const trainingPlans = await prisma.trainingPlan.findMany()
    * ```
    */
  get trainingPlan(): Prisma.TrainingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trainingPlanItem`: Exposes CRUD operations for the **TrainingPlanItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrainingPlanItems
    * const trainingPlanItems = await prisma.trainingPlanItem.findMany()
    * ```
    */
  get trainingPlanItem(): Prisma.TrainingPlanItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RunningRecord: 'RunningRecord',
    TrainingPlan: 'TrainingPlan',
    TrainingPlanItem: 'TrainingPlanItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "runningRecord" | "trainingPlan" | "trainingPlanItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RunningRecord: {
        payload: Prisma.$RunningRecordPayload<ExtArgs>
        fields: Prisma.RunningRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RunningRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RunningRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          findFirst: {
            args: Prisma.RunningRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RunningRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          findMany: {
            args: Prisma.RunningRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>[]
          }
          create: {
            args: Prisma.RunningRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          createMany: {
            args: Prisma.RunningRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RunningRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>[]
          }
          delete: {
            args: Prisma.RunningRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          update: {
            args: Prisma.RunningRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          deleteMany: {
            args: Prisma.RunningRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RunningRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RunningRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>[]
          }
          upsert: {
            args: Prisma.RunningRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RunningRecordPayload>
          }
          aggregate: {
            args: Prisma.RunningRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRunningRecord>
          }
          groupBy: {
            args: Prisma.RunningRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<RunningRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.RunningRecordCountArgs<ExtArgs>
            result: $Utils.Optional<RunningRecordCountAggregateOutputType> | number
          }
        }
      }
      TrainingPlan: {
        payload: Prisma.$TrainingPlanPayload<ExtArgs>
        fields: Prisma.TrainingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findFirst: {
            args: Prisma.TrainingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          findMany: {
            args: Prisma.TrainingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          create: {
            args: Prisma.TrainingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          createMany: {
            args: Prisma.TrainingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          delete: {
            args: Prisma.TrainingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          update: {
            args: Prisma.TrainingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          deleteMany: {
            args: Prisma.TrainingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>[]
          }
          upsert: {
            args: Prisma.TrainingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanPayload>
          }
          aggregate: {
            args: Prisma.TrainingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingPlan>
          }
          groupBy: {
            args: Prisma.TrainingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanCountAggregateOutputType> | number
          }
        }
      }
      TrainingPlanItem: {
        payload: Prisma.$TrainingPlanItemPayload<ExtArgs>
        fields: Prisma.TrainingPlanItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrainingPlanItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrainingPlanItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          findFirst: {
            args: Prisma.TrainingPlanItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrainingPlanItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          findMany: {
            args: Prisma.TrainingPlanItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>[]
          }
          create: {
            args: Prisma.TrainingPlanItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          createMany: {
            args: Prisma.TrainingPlanItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrainingPlanItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>[]
          }
          delete: {
            args: Prisma.TrainingPlanItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          update: {
            args: Prisma.TrainingPlanItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          deleteMany: {
            args: Prisma.TrainingPlanItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrainingPlanItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrainingPlanItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>[]
          }
          upsert: {
            args: Prisma.TrainingPlanItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrainingPlanItemPayload>
          }
          aggregate: {
            args: Prisma.TrainingPlanItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrainingPlanItem>
          }
          groupBy: {
            args: Prisma.TrainingPlanItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrainingPlanItemCountArgs<ExtArgs>
            result: $Utils.Optional<TrainingPlanItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    runningRecord?: RunningRecordOmit
    trainingPlan?: TrainingPlanOmit
    trainingPlanItem?: TrainingPlanItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    runningRecords: number
    trainingPlans: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runningRecords?: boolean | UserCountOutputTypeCountRunningRecordsArgs
    trainingPlans?: boolean | UserCountOutputTypeCountTrainingPlansArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRunningRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunningRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTrainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
  }


  /**
   * Count Type TrainingPlanCountOutputType
   */

  export type TrainingPlanCountOutputType = {
    items: number
  }

  export type TrainingPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | TrainingPlanCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanCountOutputType
     */
    select?: TrainingPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrainingPlanCountOutputType without action
   */
  export type TrainingPlanCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    nickname: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    passwordHash: string | null
    nickname: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    nickname: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    nickname?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    nickname?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    nickname?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    passwordHash: string
    nickname: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    nickname?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    runningRecords?: boolean | User$runningRecordsArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    nickname?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    nickname?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    nickname?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "nickname" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runningRecords?: boolean | User$runningRecordsArgs<ExtArgs>
    trainingPlans?: boolean | User$trainingPlansArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      runningRecords: Prisma.$RunningRecordPayload<ExtArgs>[]
      trainingPlans: Prisma.$TrainingPlanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      passwordHash: string
      nickname: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    runningRecords<T extends User$runningRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$runningRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    trainingPlans<T extends User$trainingPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$trainingPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.runningRecords
   */
  export type User$runningRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    where?: RunningRecordWhereInput
    orderBy?: RunningRecordOrderByWithRelationInput | RunningRecordOrderByWithRelationInput[]
    cursor?: RunningRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RunningRecordScalarFieldEnum | RunningRecordScalarFieldEnum[]
  }

  /**
   * User.trainingPlans
   */
  export type User$trainingPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    cursor?: TrainingPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RunningRecord
   */

  export type AggregateRunningRecord = {
    _count: RunningRecordCountAggregateOutputType | null
    _avg: RunningRecordAvgAggregateOutputType | null
    _sum: RunningRecordSumAggregateOutputType | null
    _min: RunningRecordMinAggregateOutputType | null
    _max: RunningRecordMaxAggregateOutputType | null
  }

  export type RunningRecordAvgAggregateOutputType = {
    userId: number | null
    distanceKm: number | null
    durationSec: number | null
    paceSecPerKm: number | null
  }

  export type RunningRecordSumAggregateOutputType = {
    userId: number | null
    distanceKm: number | null
    durationSec: number | null
    paceSecPerKm: number | null
  }

  export type RunningRecordMinAggregateOutputType = {
    id: string | null
    userId: number | null
    distanceKm: number | null
    durationSec: number | null
    paceSecPerKm: number | null
    runDate: Date | null
    memo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RunningRecordMaxAggregateOutputType = {
    id: string | null
    userId: number | null
    distanceKm: number | null
    durationSec: number | null
    paceSecPerKm: number | null
    runDate: Date | null
    memo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RunningRecordCountAggregateOutputType = {
    id: number
    userId: number
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: number
    memo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RunningRecordAvgAggregateInputType = {
    userId?: true
    distanceKm?: true
    durationSec?: true
    paceSecPerKm?: true
  }

  export type RunningRecordSumAggregateInputType = {
    userId?: true
    distanceKm?: true
    durationSec?: true
    paceSecPerKm?: true
  }

  export type RunningRecordMinAggregateInputType = {
    id?: true
    userId?: true
    distanceKm?: true
    durationSec?: true
    paceSecPerKm?: true
    runDate?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RunningRecordMaxAggregateInputType = {
    id?: true
    userId?: true
    distanceKm?: true
    durationSec?: true
    paceSecPerKm?: true
    runDate?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RunningRecordCountAggregateInputType = {
    id?: true
    userId?: true
    distanceKm?: true
    durationSec?: true
    paceSecPerKm?: true
    runDate?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RunningRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunningRecord to aggregate.
     */
    where?: RunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunningRecords to fetch.
     */
    orderBy?: RunningRecordOrderByWithRelationInput | RunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RunningRecords
    **/
    _count?: true | RunningRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RunningRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RunningRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RunningRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RunningRecordMaxAggregateInputType
  }

  export type GetRunningRecordAggregateType<T extends RunningRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateRunningRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRunningRecord[P]>
      : GetScalarType<T[P], AggregateRunningRecord[P]>
  }




  export type RunningRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RunningRecordWhereInput
    orderBy?: RunningRecordOrderByWithAggregationInput | RunningRecordOrderByWithAggregationInput[]
    by: RunningRecordScalarFieldEnum[] | RunningRecordScalarFieldEnum
    having?: RunningRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RunningRecordCountAggregateInputType | true
    _avg?: RunningRecordAvgAggregateInputType
    _sum?: RunningRecordSumAggregateInputType
    _min?: RunningRecordMinAggregateInputType
    _max?: RunningRecordMaxAggregateInputType
  }

  export type RunningRecordGroupByOutputType = {
    id: string
    userId: number
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date
    memo: string | null
    createdAt: Date
    updatedAt: Date
    _count: RunningRecordCountAggregateOutputType | null
    _avg: RunningRecordAvgAggregateOutputType | null
    _sum: RunningRecordSumAggregateOutputType | null
    _min: RunningRecordMinAggregateOutputType | null
    _max: RunningRecordMaxAggregateOutputType | null
  }

  type GetRunningRecordGroupByPayload<T extends RunningRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RunningRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RunningRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RunningRecordGroupByOutputType[P]>
            : GetScalarType<T[P], RunningRecordGroupByOutputType[P]>
        }
      >
    >


  export type RunningRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    distanceKm?: boolean
    durationSec?: boolean
    paceSecPerKm?: boolean
    runDate?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runningRecord"]>

  export type RunningRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    distanceKm?: boolean
    durationSec?: boolean
    paceSecPerKm?: boolean
    runDate?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runningRecord"]>

  export type RunningRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    distanceKm?: boolean
    durationSec?: boolean
    paceSecPerKm?: boolean
    runDate?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["runningRecord"]>

  export type RunningRecordSelectScalar = {
    id?: boolean
    userId?: boolean
    distanceKm?: boolean
    durationSec?: boolean
    paceSecPerKm?: boolean
    runDate?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RunningRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "distanceKm" | "durationSec" | "paceSecPerKm" | "runDate" | "memo" | "createdAt" | "updatedAt", ExtArgs["result"]["runningRecord"]>
  export type RunningRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RunningRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RunningRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RunningRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RunningRecord"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: number
      distanceKm: number
      durationSec: number
      paceSecPerKm: number
      runDate: Date
      memo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["runningRecord"]>
    composites: {}
  }

  type RunningRecordGetPayload<S extends boolean | null | undefined | RunningRecordDefaultArgs> = $Result.GetResult<Prisma.$RunningRecordPayload, S>

  type RunningRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RunningRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RunningRecordCountAggregateInputType | true
    }

  export interface RunningRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RunningRecord'], meta: { name: 'RunningRecord' } }
    /**
     * Find zero or one RunningRecord that matches the filter.
     * @param {RunningRecordFindUniqueArgs} args - Arguments to find a RunningRecord
     * @example
     * // Get one RunningRecord
     * const runningRecord = await prisma.runningRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RunningRecordFindUniqueArgs>(args: SelectSubset<T, RunningRecordFindUniqueArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RunningRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RunningRecordFindUniqueOrThrowArgs} args - Arguments to find a RunningRecord
     * @example
     * // Get one RunningRecord
     * const runningRecord = await prisma.runningRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RunningRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, RunningRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunningRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordFindFirstArgs} args - Arguments to find a RunningRecord
     * @example
     * // Get one RunningRecord
     * const runningRecord = await prisma.runningRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RunningRecordFindFirstArgs>(args?: SelectSubset<T, RunningRecordFindFirstArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RunningRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordFindFirstOrThrowArgs} args - Arguments to find a RunningRecord
     * @example
     * // Get one RunningRecord
     * const runningRecord = await prisma.runningRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RunningRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, RunningRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RunningRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RunningRecords
     * const runningRecords = await prisma.runningRecord.findMany()
     * 
     * // Get first 10 RunningRecords
     * const runningRecords = await prisma.runningRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const runningRecordWithIdOnly = await prisma.runningRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RunningRecordFindManyArgs>(args?: SelectSubset<T, RunningRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RunningRecord.
     * @param {RunningRecordCreateArgs} args - Arguments to create a RunningRecord.
     * @example
     * // Create one RunningRecord
     * const RunningRecord = await prisma.runningRecord.create({
     *   data: {
     *     // ... data to create a RunningRecord
     *   }
     * })
     * 
     */
    create<T extends RunningRecordCreateArgs>(args: SelectSubset<T, RunningRecordCreateArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RunningRecords.
     * @param {RunningRecordCreateManyArgs} args - Arguments to create many RunningRecords.
     * @example
     * // Create many RunningRecords
     * const runningRecord = await prisma.runningRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RunningRecordCreateManyArgs>(args?: SelectSubset<T, RunningRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RunningRecords and returns the data saved in the database.
     * @param {RunningRecordCreateManyAndReturnArgs} args - Arguments to create many RunningRecords.
     * @example
     * // Create many RunningRecords
     * const runningRecord = await prisma.runningRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RunningRecords and only return the `id`
     * const runningRecordWithIdOnly = await prisma.runningRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RunningRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, RunningRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RunningRecord.
     * @param {RunningRecordDeleteArgs} args - Arguments to delete one RunningRecord.
     * @example
     * // Delete one RunningRecord
     * const RunningRecord = await prisma.runningRecord.delete({
     *   where: {
     *     // ... filter to delete one RunningRecord
     *   }
     * })
     * 
     */
    delete<T extends RunningRecordDeleteArgs>(args: SelectSubset<T, RunningRecordDeleteArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RunningRecord.
     * @param {RunningRecordUpdateArgs} args - Arguments to update one RunningRecord.
     * @example
     * // Update one RunningRecord
     * const runningRecord = await prisma.runningRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RunningRecordUpdateArgs>(args: SelectSubset<T, RunningRecordUpdateArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RunningRecords.
     * @param {RunningRecordDeleteManyArgs} args - Arguments to filter RunningRecords to delete.
     * @example
     * // Delete a few RunningRecords
     * const { count } = await prisma.runningRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RunningRecordDeleteManyArgs>(args?: SelectSubset<T, RunningRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunningRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RunningRecords
     * const runningRecord = await prisma.runningRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RunningRecordUpdateManyArgs>(args: SelectSubset<T, RunningRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RunningRecords and returns the data updated in the database.
     * @param {RunningRecordUpdateManyAndReturnArgs} args - Arguments to update many RunningRecords.
     * @example
     * // Update many RunningRecords
     * const runningRecord = await prisma.runningRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RunningRecords and only return the `id`
     * const runningRecordWithIdOnly = await prisma.runningRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RunningRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, RunningRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RunningRecord.
     * @param {RunningRecordUpsertArgs} args - Arguments to update or create a RunningRecord.
     * @example
     * // Update or create a RunningRecord
     * const runningRecord = await prisma.runningRecord.upsert({
     *   create: {
     *     // ... data to create a RunningRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RunningRecord we want to update
     *   }
     * })
     */
    upsert<T extends RunningRecordUpsertArgs>(args: SelectSubset<T, RunningRecordUpsertArgs<ExtArgs>>): Prisma__RunningRecordClient<$Result.GetResult<Prisma.$RunningRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RunningRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordCountArgs} args - Arguments to filter RunningRecords to count.
     * @example
     * // Count the number of RunningRecords
     * const count = await prisma.runningRecord.count({
     *   where: {
     *     // ... the filter for the RunningRecords we want to count
     *   }
     * })
    **/
    count<T extends RunningRecordCountArgs>(
      args?: Subset<T, RunningRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RunningRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RunningRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RunningRecordAggregateArgs>(args: Subset<T, RunningRecordAggregateArgs>): Prisma.PrismaPromise<GetRunningRecordAggregateType<T>>

    /**
     * Group by RunningRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RunningRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RunningRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RunningRecordGroupByArgs['orderBy'] }
        : { orderBy?: RunningRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RunningRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRunningRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RunningRecord model
   */
  readonly fields: RunningRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RunningRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RunningRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RunningRecord model
   */
  interface RunningRecordFieldRefs {
    readonly id: FieldRef<"RunningRecord", 'String'>
    readonly userId: FieldRef<"RunningRecord", 'Int'>
    readonly distanceKm: FieldRef<"RunningRecord", 'Float'>
    readonly durationSec: FieldRef<"RunningRecord", 'Int'>
    readonly paceSecPerKm: FieldRef<"RunningRecord", 'Int'>
    readonly runDate: FieldRef<"RunningRecord", 'DateTime'>
    readonly memo: FieldRef<"RunningRecord", 'String'>
    readonly createdAt: FieldRef<"RunningRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"RunningRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RunningRecord findUnique
   */
  export type RunningRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which RunningRecord to fetch.
     */
    where: RunningRecordWhereUniqueInput
  }

  /**
   * RunningRecord findUniqueOrThrow
   */
  export type RunningRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which RunningRecord to fetch.
     */
    where: RunningRecordWhereUniqueInput
  }

  /**
   * RunningRecord findFirst
   */
  export type RunningRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which RunningRecord to fetch.
     */
    where?: RunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunningRecords to fetch.
     */
    orderBy?: RunningRecordOrderByWithRelationInput | RunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunningRecords.
     */
    cursor?: RunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunningRecords.
     */
    distinct?: RunningRecordScalarFieldEnum | RunningRecordScalarFieldEnum[]
  }

  /**
   * RunningRecord findFirstOrThrow
   */
  export type RunningRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which RunningRecord to fetch.
     */
    where?: RunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunningRecords to fetch.
     */
    orderBy?: RunningRecordOrderByWithRelationInput | RunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RunningRecords.
     */
    cursor?: RunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunningRecords.
     */
    distinct?: RunningRecordScalarFieldEnum | RunningRecordScalarFieldEnum[]
  }

  /**
   * RunningRecord findMany
   */
  export type RunningRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter, which RunningRecords to fetch.
     */
    where?: RunningRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RunningRecords to fetch.
     */
    orderBy?: RunningRecordOrderByWithRelationInput | RunningRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RunningRecords.
     */
    cursor?: RunningRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RunningRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RunningRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RunningRecords.
     */
    distinct?: RunningRecordScalarFieldEnum | RunningRecordScalarFieldEnum[]
  }

  /**
   * RunningRecord create
   */
  export type RunningRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a RunningRecord.
     */
    data: XOR<RunningRecordCreateInput, RunningRecordUncheckedCreateInput>
  }

  /**
   * RunningRecord createMany
   */
  export type RunningRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RunningRecords.
     */
    data: RunningRecordCreateManyInput | RunningRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RunningRecord createManyAndReturn
   */
  export type RunningRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * The data used to create many RunningRecords.
     */
    data: RunningRecordCreateManyInput | RunningRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunningRecord update
   */
  export type RunningRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a RunningRecord.
     */
    data: XOR<RunningRecordUpdateInput, RunningRecordUncheckedUpdateInput>
    /**
     * Choose, which RunningRecord to update.
     */
    where: RunningRecordWhereUniqueInput
  }

  /**
   * RunningRecord updateMany
   */
  export type RunningRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RunningRecords.
     */
    data: XOR<RunningRecordUpdateManyMutationInput, RunningRecordUncheckedUpdateManyInput>
    /**
     * Filter which RunningRecords to update
     */
    where?: RunningRecordWhereInput
    /**
     * Limit how many RunningRecords to update.
     */
    limit?: number
  }

  /**
   * RunningRecord updateManyAndReturn
   */
  export type RunningRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * The data used to update RunningRecords.
     */
    data: XOR<RunningRecordUpdateManyMutationInput, RunningRecordUncheckedUpdateManyInput>
    /**
     * Filter which RunningRecords to update
     */
    where?: RunningRecordWhereInput
    /**
     * Limit how many RunningRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RunningRecord upsert
   */
  export type RunningRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the RunningRecord to update in case it exists.
     */
    where: RunningRecordWhereUniqueInput
    /**
     * In case the RunningRecord found by the `where` argument doesn't exist, create a new RunningRecord with this data.
     */
    create: XOR<RunningRecordCreateInput, RunningRecordUncheckedCreateInput>
    /**
     * In case the RunningRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RunningRecordUpdateInput, RunningRecordUncheckedUpdateInput>
  }

  /**
   * RunningRecord delete
   */
  export type RunningRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
    /**
     * Filter which RunningRecord to delete.
     */
    where: RunningRecordWhereUniqueInput
  }

  /**
   * RunningRecord deleteMany
   */
  export type RunningRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RunningRecords to delete
     */
    where?: RunningRecordWhereInput
    /**
     * Limit how many RunningRecords to delete.
     */
    limit?: number
  }

  /**
   * RunningRecord without action
   */
  export type RunningRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RunningRecord
     */
    select?: RunningRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RunningRecord
     */
    omit?: RunningRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RunningRecordInclude<ExtArgs> | null
  }


  /**
   * Model TrainingPlan
   */

  export type AggregateTrainingPlan = {
    _count: TrainingPlanCountAggregateOutputType | null
    _avg: TrainingPlanAvgAggregateOutputType | null
    _sum: TrainingPlanSumAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  export type TrainingPlanAvgAggregateOutputType = {
    userId: number | null
  }

  export type TrainingPlanSumAggregateOutputType = {
    userId: number | null
  }

  export type TrainingPlanMinAggregateOutputType = {
    id: string | null
    userId: number | null
    title: string | null
    goalType: string | null
    level: string | null
    startDate: Date | null
    endDate: Date | null
    sourceType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingPlanMaxAggregateOutputType = {
    id: string | null
    userId: number | null
    title: string | null
    goalType: string | null
    level: string | null
    startDate: Date | null
    endDate: Date | null
    sourceType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TrainingPlanCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    goalType: number
    level: number
    startDate: number
    endDate: number
    sourceType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TrainingPlanAvgAggregateInputType = {
    userId?: true
  }

  export type TrainingPlanSumAggregateInputType = {
    userId?: true
  }

  export type TrainingPlanMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    goalType?: true
    level?: true
    startDate?: true
    endDate?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    goalType?: true
    level?: true
    startDate?: true
    endDate?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TrainingPlanCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    goalType?: true
    level?: true
    startDate?: true
    endDate?: true
    sourceType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TrainingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlan to aggregate.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingPlans
    **/
    _count?: true | TrainingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type GetTrainingPlanAggregateType<T extends TrainingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingPlan[P]>
      : GetScalarType<T[P], AggregateTrainingPlan[P]>
  }




  export type TrainingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanWhereInput
    orderBy?: TrainingPlanOrderByWithAggregationInput | TrainingPlanOrderByWithAggregationInput[]
    by: TrainingPlanScalarFieldEnum[] | TrainingPlanScalarFieldEnum
    having?: TrainingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingPlanCountAggregateInputType | true
    _avg?: TrainingPlanAvgAggregateInputType
    _sum?: TrainingPlanSumAggregateInputType
    _min?: TrainingPlanMinAggregateInputType
    _max?: TrainingPlanMaxAggregateInputType
  }

  export type TrainingPlanGroupByOutputType = {
    id: string
    userId: number
    title: string
    goalType: string
    level: string
    startDate: Date
    endDate: Date
    sourceType: string
    createdAt: Date
    updatedAt: Date
    _count: TrainingPlanCountAggregateOutputType | null
    _avg: TrainingPlanAvgAggregateOutputType | null
    _sum: TrainingPlanSumAggregateOutputType | null
    _min: TrainingPlanMinAggregateOutputType | null
    _max: TrainingPlanMaxAggregateOutputType | null
  }

  type GetTrainingPlanGroupByPayload<T extends TrainingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingPlanGroupByOutputType[P]>
        }
      >
    >


  export type TrainingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    goalType?: boolean
    level?: boolean
    startDate?: boolean
    endDate?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | TrainingPlan$itemsArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    goalType?: boolean
    level?: boolean
    startDate?: boolean
    endDate?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    goalType?: boolean
    level?: boolean
    startDate?: boolean
    endDate?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlan"]>

  export type TrainingPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    goalType?: boolean
    level?: boolean
    startDate?: boolean
    endDate?: boolean
    sourceType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TrainingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "goalType" | "level" | "startDate" | "endDate" | "sourceType" | "createdAt" | "updatedAt", ExtArgs["result"]["trainingPlan"]>
  export type TrainingPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | TrainingPlan$itemsArgs<ExtArgs>
    _count?: boolean | TrainingPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TrainingPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TrainingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$TrainingPlanItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: number
      title: string
      goalType: string
      level: string
      startDate: Date
      endDate: Date
      sourceType: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trainingPlan"]>
    composites: {}
  }

  type TrainingPlanGetPayload<S extends boolean | null | undefined | TrainingPlanDefaultArgs> = $Result.GetResult<Prisma.$TrainingPlanPayload, S>

  type TrainingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingPlanCountAggregateInputType | true
    }

  export interface TrainingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingPlan'], meta: { name: 'TrainingPlan' } }
    /**
     * Find zero or one TrainingPlan that matches the filter.
     * @param {TrainingPlanFindUniqueArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingPlanFindUniqueArgs>(args: SelectSubset<T, TrainingPlanFindUniqueArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingPlanFindUniqueOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingPlanFindFirstArgs>(args?: SelectSubset<T, TrainingPlanFindFirstArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindFirstOrThrowArgs} args - Arguments to find a TrainingPlan
     * @example
     * // Get one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany()
     * 
     * // Get first 10 TrainingPlans
     * const trainingPlans = await prisma.trainingPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingPlanFindManyArgs>(args?: SelectSubset<T, TrainingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingPlan.
     * @param {TrainingPlanCreateArgs} args - Arguments to create a TrainingPlan.
     * @example
     * // Create one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.create({
     *   data: {
     *     // ... data to create a TrainingPlan
     *   }
     * })
     * 
     */
    create<T extends TrainingPlanCreateArgs>(args: SelectSubset<T, TrainingPlanCreateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingPlans.
     * @param {TrainingPlanCreateManyArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingPlanCreateManyArgs>(args?: SelectSubset<T, TrainingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingPlans and returns the data saved in the database.
     * @param {TrainingPlanCreateManyAndReturnArgs} args - Arguments to create many TrainingPlans.
     * @example
     * // Create many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingPlan.
     * @param {TrainingPlanDeleteArgs} args - Arguments to delete one TrainingPlan.
     * @example
     * // Delete one TrainingPlan
     * const TrainingPlan = await prisma.trainingPlan.delete({
     *   where: {
     *     // ... filter to delete one TrainingPlan
     *   }
     * })
     * 
     */
    delete<T extends TrainingPlanDeleteArgs>(args: SelectSubset<T, TrainingPlanDeleteArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingPlan.
     * @param {TrainingPlanUpdateArgs} args - Arguments to update one TrainingPlan.
     * @example
     * // Update one TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingPlanUpdateArgs>(args: SelectSubset<T, TrainingPlanUpdateArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingPlans.
     * @param {TrainingPlanDeleteManyArgs} args - Arguments to filter TrainingPlans to delete.
     * @example
     * // Delete a few TrainingPlans
     * const { count } = await prisma.trainingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingPlanDeleteManyArgs>(args?: SelectSubset<T, TrainingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingPlanUpdateManyArgs>(args: SelectSubset<T, TrainingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlans and returns the data updated in the database.
     * @param {TrainingPlanUpdateManyAndReturnArgs} args - Arguments to update many TrainingPlans.
     * @example
     * // Update many TrainingPlans
     * const trainingPlan = await prisma.trainingPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingPlans and only return the `id`
     * const trainingPlanWithIdOnly = await prisma.trainingPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingPlan.
     * @param {TrainingPlanUpsertArgs} args - Arguments to update or create a TrainingPlan.
     * @example
     * // Update or create a TrainingPlan
     * const trainingPlan = await prisma.trainingPlan.upsert({
     *   create: {
     *     // ... data to create a TrainingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingPlan we want to update
     *   }
     * })
     */
    upsert<T extends TrainingPlanUpsertArgs>(args: SelectSubset<T, TrainingPlanUpsertArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanCountArgs} args - Arguments to filter TrainingPlans to count.
     * @example
     * // Count the number of TrainingPlans
     * const count = await prisma.trainingPlan.count({
     *   where: {
     *     // ... the filter for the TrainingPlans we want to count
     *   }
     * })
    **/
    count<T extends TrainingPlanCountArgs>(
      args?: Subset<T, TrainingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingPlanAggregateArgs>(args: Subset<T, TrainingPlanAggregateArgs>): Prisma.PrismaPromise<GetTrainingPlanAggregateType<T>>

    /**
     * Group by TrainingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingPlanGroupByArgs['orderBy'] }
        : { orderBy?: TrainingPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingPlan model
   */
  readonly fields: TrainingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends TrainingPlan$itemsArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlan$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingPlan model
   */
  interface TrainingPlanFieldRefs {
    readonly id: FieldRef<"TrainingPlan", 'String'>
    readonly userId: FieldRef<"TrainingPlan", 'Int'>
    readonly title: FieldRef<"TrainingPlan", 'String'>
    readonly goalType: FieldRef<"TrainingPlan", 'String'>
    readonly level: FieldRef<"TrainingPlan", 'String'>
    readonly startDate: FieldRef<"TrainingPlan", 'DateTime'>
    readonly endDate: FieldRef<"TrainingPlan", 'DateTime'>
    readonly sourceType: FieldRef<"TrainingPlan", 'String'>
    readonly createdAt: FieldRef<"TrainingPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"TrainingPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrainingPlan findUnique
   */
  export type TrainingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findUniqueOrThrow
   */
  export type TrainingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan findFirst
   */
  export type TrainingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findFirstOrThrow
   */
  export type TrainingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlan to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan findMany
   */
  export type TrainingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlans to fetch.
     */
    where?: TrainingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlans to fetch.
     */
    orderBy?: TrainingPlanOrderByWithRelationInput | TrainingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingPlans.
     */
    cursor?: TrainingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlans.
     */
    distinct?: TrainingPlanScalarFieldEnum | TrainingPlanScalarFieldEnum[]
  }

  /**
   * TrainingPlan create
   */
  export type TrainingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingPlan.
     */
    data: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
  }

  /**
   * TrainingPlan createMany
   */
  export type TrainingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingPlan createManyAndReturn
   */
  export type TrainingPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingPlans.
     */
    data: TrainingPlanCreateManyInput | TrainingPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan update
   */
  export type TrainingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingPlan.
     */
    data: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
    /**
     * Choose, which TrainingPlan to update.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan updateMany
   */
  export type TrainingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
  }

  /**
   * TrainingPlan updateManyAndReturn
   */
  export type TrainingPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * The data used to update TrainingPlans.
     */
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlans to update
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlan upsert
   */
  export type TrainingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingPlan to update in case it exists.
     */
    where: TrainingPlanWhereUniqueInput
    /**
     * In case the TrainingPlan found by the `where` argument doesn't exist, create a new TrainingPlan with this data.
     */
    create: XOR<TrainingPlanCreateInput, TrainingPlanUncheckedCreateInput>
    /**
     * In case the TrainingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingPlanUpdateInput, TrainingPlanUncheckedUpdateInput>
  }

  /**
   * TrainingPlan delete
   */
  export type TrainingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
    /**
     * Filter which TrainingPlan to delete.
     */
    where: TrainingPlanWhereUniqueInput
  }

  /**
   * TrainingPlan deleteMany
   */
  export type TrainingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlans to delete
     */
    where?: TrainingPlanWhereInput
    /**
     * Limit how many TrainingPlans to delete.
     */
    limit?: number
  }

  /**
   * TrainingPlan.items
   */
  export type TrainingPlan$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    where?: TrainingPlanItemWhereInput
    orderBy?: TrainingPlanItemOrderByWithRelationInput | TrainingPlanItemOrderByWithRelationInput[]
    cursor?: TrainingPlanItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrainingPlanItemScalarFieldEnum | TrainingPlanItemScalarFieldEnum[]
  }

  /**
   * TrainingPlan without action
   */
  export type TrainingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlan
     */
    select?: TrainingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlan
     */
    omit?: TrainingPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanInclude<ExtArgs> | null
  }


  /**
   * Model TrainingPlanItem
   */

  export type AggregateTrainingPlanItem = {
    _count: TrainingPlanItemCountAggregateOutputType | null
    _avg: TrainingPlanItemAvgAggregateOutputType | null
    _sum: TrainingPlanItemSumAggregateOutputType | null
    _min: TrainingPlanItemMinAggregateOutputType | null
    _max: TrainingPlanItemMaxAggregateOutputType | null
  }

  export type TrainingPlanItemAvgAggregateOutputType = {
    distanceKm: number | null
    targetPaceSecPerKm: number | null
    sortOrder: number | null
  }

  export type TrainingPlanItemSumAggregateOutputType = {
    distanceKm: number | null
    targetPaceSecPerKm: number | null
    sortOrder: number | null
  }

  export type TrainingPlanItemMinAggregateOutputType = {
    id: string | null
    trainingPlanId: string | null
    planDate: Date | null
    workoutType: string | null
    distanceKm: number | null
    targetPaceSecPerKm: number | null
    description: string | null
    sortOrder: number | null
  }

  export type TrainingPlanItemMaxAggregateOutputType = {
    id: string | null
    trainingPlanId: string | null
    planDate: Date | null
    workoutType: string | null
    distanceKm: number | null
    targetPaceSecPerKm: number | null
    description: string | null
    sortOrder: number | null
  }

  export type TrainingPlanItemCountAggregateOutputType = {
    id: number
    trainingPlanId: number
    planDate: number
    workoutType: number
    distanceKm: number
    targetPaceSecPerKm: number
    description: number
    sortOrder: number
    _all: number
  }


  export type TrainingPlanItemAvgAggregateInputType = {
    distanceKm?: true
    targetPaceSecPerKm?: true
    sortOrder?: true
  }

  export type TrainingPlanItemSumAggregateInputType = {
    distanceKm?: true
    targetPaceSecPerKm?: true
    sortOrder?: true
  }

  export type TrainingPlanItemMinAggregateInputType = {
    id?: true
    trainingPlanId?: true
    planDate?: true
    workoutType?: true
    distanceKm?: true
    targetPaceSecPerKm?: true
    description?: true
    sortOrder?: true
  }

  export type TrainingPlanItemMaxAggregateInputType = {
    id?: true
    trainingPlanId?: true
    planDate?: true
    workoutType?: true
    distanceKm?: true
    targetPaceSecPerKm?: true
    description?: true
    sortOrder?: true
  }

  export type TrainingPlanItemCountAggregateInputType = {
    id?: true
    trainingPlanId?: true
    planDate?: true
    workoutType?: true
    distanceKm?: true
    targetPaceSecPerKm?: true
    description?: true
    sortOrder?: true
    _all?: true
  }

  export type TrainingPlanItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlanItem to aggregate.
     */
    where?: TrainingPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanItems to fetch.
     */
    orderBy?: TrainingPlanItemOrderByWithRelationInput | TrainingPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrainingPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrainingPlanItems
    **/
    _count?: true | TrainingPlanItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrainingPlanItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrainingPlanItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrainingPlanItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrainingPlanItemMaxAggregateInputType
  }

  export type GetTrainingPlanItemAggregateType<T extends TrainingPlanItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTrainingPlanItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrainingPlanItem[P]>
      : GetScalarType<T[P], AggregateTrainingPlanItem[P]>
  }




  export type TrainingPlanItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrainingPlanItemWhereInput
    orderBy?: TrainingPlanItemOrderByWithAggregationInput | TrainingPlanItemOrderByWithAggregationInput[]
    by: TrainingPlanItemScalarFieldEnum[] | TrainingPlanItemScalarFieldEnum
    having?: TrainingPlanItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrainingPlanItemCountAggregateInputType | true
    _avg?: TrainingPlanItemAvgAggregateInputType
    _sum?: TrainingPlanItemSumAggregateInputType
    _min?: TrainingPlanItemMinAggregateInputType
    _max?: TrainingPlanItemMaxAggregateInputType
  }

  export type TrainingPlanItemGroupByOutputType = {
    id: string
    trainingPlanId: string
    planDate: Date
    workoutType: string
    distanceKm: number | null
    targetPaceSecPerKm: number | null
    description: string | null
    sortOrder: number
    _count: TrainingPlanItemCountAggregateOutputType | null
    _avg: TrainingPlanItemAvgAggregateOutputType | null
    _sum: TrainingPlanItemSumAggregateOutputType | null
    _min: TrainingPlanItemMinAggregateOutputType | null
    _max: TrainingPlanItemMaxAggregateOutputType | null
  }

  type GetTrainingPlanItemGroupByPayload<T extends TrainingPlanItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrainingPlanItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrainingPlanItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrainingPlanItemGroupByOutputType[P]>
            : GetScalarType<T[P], TrainingPlanItemGroupByOutputType[P]>
        }
      >
    >


  export type TrainingPlanItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    planDate?: boolean
    workoutType?: boolean
    distanceKm?: boolean
    targetPaceSecPerKm?: boolean
    description?: boolean
    sortOrder?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanItem"]>

  export type TrainingPlanItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    planDate?: boolean
    workoutType?: boolean
    distanceKm?: boolean
    targetPaceSecPerKm?: boolean
    description?: boolean
    sortOrder?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanItem"]>

  export type TrainingPlanItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trainingPlanId?: boolean
    planDate?: boolean
    workoutType?: boolean
    distanceKm?: boolean
    targetPaceSecPerKm?: boolean
    description?: boolean
    sortOrder?: boolean
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trainingPlanItem"]>

  export type TrainingPlanItemSelectScalar = {
    id?: boolean
    trainingPlanId?: boolean
    planDate?: boolean
    workoutType?: boolean
    distanceKm?: boolean
    targetPaceSecPerKm?: boolean
    description?: boolean
    sortOrder?: boolean
  }

  export type TrainingPlanItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trainingPlanId" | "planDate" | "workoutType" | "distanceKm" | "targetPaceSecPerKm" | "description" | "sortOrder", ExtArgs["result"]["trainingPlanItem"]>
  export type TrainingPlanItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }
  export type TrainingPlanItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }
  export type TrainingPlanItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trainingPlan?: boolean | TrainingPlanDefaultArgs<ExtArgs>
  }

  export type $TrainingPlanItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrainingPlanItem"
    objects: {
      trainingPlan: Prisma.$TrainingPlanPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trainingPlanId: string
      planDate: Date
      workoutType: string
      distanceKm: number | null
      targetPaceSecPerKm: number | null
      description: string | null
      sortOrder: number
    }, ExtArgs["result"]["trainingPlanItem"]>
    composites: {}
  }

  type TrainingPlanItemGetPayload<S extends boolean | null | undefined | TrainingPlanItemDefaultArgs> = $Result.GetResult<Prisma.$TrainingPlanItemPayload, S>

  type TrainingPlanItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrainingPlanItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrainingPlanItemCountAggregateInputType | true
    }

  export interface TrainingPlanItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrainingPlanItem'], meta: { name: 'TrainingPlanItem' } }
    /**
     * Find zero or one TrainingPlanItem that matches the filter.
     * @param {TrainingPlanItemFindUniqueArgs} args - Arguments to find a TrainingPlanItem
     * @example
     * // Get one TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainingPlanItemFindUniqueArgs>(args: SelectSubset<T, TrainingPlanItemFindUniqueArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrainingPlanItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainingPlanItemFindUniqueOrThrowArgs} args - Arguments to find a TrainingPlanItem
     * @example
     * // Get one TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainingPlanItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TrainingPlanItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlanItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemFindFirstArgs} args - Arguments to find a TrainingPlanItem
     * @example
     * // Get one TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainingPlanItemFindFirstArgs>(args?: SelectSubset<T, TrainingPlanItemFindFirstArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrainingPlanItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemFindFirstOrThrowArgs} args - Arguments to find a TrainingPlanItem
     * @example
     * // Get one TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainingPlanItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TrainingPlanItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrainingPlanItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainingPlanItems
     * const trainingPlanItems = await prisma.trainingPlanItem.findMany()
     * 
     * // Get first 10 TrainingPlanItems
     * const trainingPlanItems = await prisma.trainingPlanItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trainingPlanItemWithIdOnly = await prisma.trainingPlanItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrainingPlanItemFindManyArgs>(args?: SelectSubset<T, TrainingPlanItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrainingPlanItem.
     * @param {TrainingPlanItemCreateArgs} args - Arguments to create a TrainingPlanItem.
     * @example
     * // Create one TrainingPlanItem
     * const TrainingPlanItem = await prisma.trainingPlanItem.create({
     *   data: {
     *     // ... data to create a TrainingPlanItem
     *   }
     * })
     * 
     */
    create<T extends TrainingPlanItemCreateArgs>(args: SelectSubset<T, TrainingPlanItemCreateArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrainingPlanItems.
     * @param {TrainingPlanItemCreateManyArgs} args - Arguments to create many TrainingPlanItems.
     * @example
     * // Create many TrainingPlanItems
     * const trainingPlanItem = await prisma.trainingPlanItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrainingPlanItemCreateManyArgs>(args?: SelectSubset<T, TrainingPlanItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrainingPlanItems and returns the data saved in the database.
     * @param {TrainingPlanItemCreateManyAndReturnArgs} args - Arguments to create many TrainingPlanItems.
     * @example
     * // Create many TrainingPlanItems
     * const trainingPlanItem = await prisma.trainingPlanItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrainingPlanItems and only return the `id`
     * const trainingPlanItemWithIdOnly = await prisma.trainingPlanItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrainingPlanItemCreateManyAndReturnArgs>(args?: SelectSubset<T, TrainingPlanItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrainingPlanItem.
     * @param {TrainingPlanItemDeleteArgs} args - Arguments to delete one TrainingPlanItem.
     * @example
     * // Delete one TrainingPlanItem
     * const TrainingPlanItem = await prisma.trainingPlanItem.delete({
     *   where: {
     *     // ... filter to delete one TrainingPlanItem
     *   }
     * })
     * 
     */
    delete<T extends TrainingPlanItemDeleteArgs>(args: SelectSubset<T, TrainingPlanItemDeleteArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrainingPlanItem.
     * @param {TrainingPlanItemUpdateArgs} args - Arguments to update one TrainingPlanItem.
     * @example
     * // Update one TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrainingPlanItemUpdateArgs>(args: SelectSubset<T, TrainingPlanItemUpdateArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrainingPlanItems.
     * @param {TrainingPlanItemDeleteManyArgs} args - Arguments to filter TrainingPlanItems to delete.
     * @example
     * // Delete a few TrainingPlanItems
     * const { count } = await prisma.trainingPlanItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrainingPlanItemDeleteManyArgs>(args?: SelectSubset<T, TrainingPlanItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainingPlanItems
     * const trainingPlanItem = await prisma.trainingPlanItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrainingPlanItemUpdateManyArgs>(args: SelectSubset<T, TrainingPlanItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrainingPlanItems and returns the data updated in the database.
     * @param {TrainingPlanItemUpdateManyAndReturnArgs} args - Arguments to update many TrainingPlanItems.
     * @example
     * // Update many TrainingPlanItems
     * const trainingPlanItem = await prisma.trainingPlanItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrainingPlanItems and only return the `id`
     * const trainingPlanItemWithIdOnly = await prisma.trainingPlanItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrainingPlanItemUpdateManyAndReturnArgs>(args: SelectSubset<T, TrainingPlanItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrainingPlanItem.
     * @param {TrainingPlanItemUpsertArgs} args - Arguments to update or create a TrainingPlanItem.
     * @example
     * // Update or create a TrainingPlanItem
     * const trainingPlanItem = await prisma.trainingPlanItem.upsert({
     *   create: {
     *     // ... data to create a TrainingPlanItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainingPlanItem we want to update
     *   }
     * })
     */
    upsert<T extends TrainingPlanItemUpsertArgs>(args: SelectSubset<T, TrainingPlanItemUpsertArgs<ExtArgs>>): Prisma__TrainingPlanItemClient<$Result.GetResult<Prisma.$TrainingPlanItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrainingPlanItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemCountArgs} args - Arguments to filter TrainingPlanItems to count.
     * @example
     * // Count the number of TrainingPlanItems
     * const count = await prisma.trainingPlanItem.count({
     *   where: {
     *     // ... the filter for the TrainingPlanItems we want to count
     *   }
     * })
    **/
    count<T extends TrainingPlanItemCountArgs>(
      args?: Subset<T, TrainingPlanItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrainingPlanItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrainingPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrainingPlanItemAggregateArgs>(args: Subset<T, TrainingPlanItemAggregateArgs>): Prisma.PrismaPromise<GetTrainingPlanItemAggregateType<T>>

    /**
     * Group by TrainingPlanItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainingPlanItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrainingPlanItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrainingPlanItemGroupByArgs['orderBy'] }
        : { orderBy?: TrainingPlanItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrainingPlanItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainingPlanItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrainingPlanItem model
   */
  readonly fields: TrainingPlanItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrainingPlanItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrainingPlanItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trainingPlan<T extends TrainingPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrainingPlanDefaultArgs<ExtArgs>>): Prisma__TrainingPlanClient<$Result.GetResult<Prisma.$TrainingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrainingPlanItem model
   */
  interface TrainingPlanItemFieldRefs {
    readonly id: FieldRef<"TrainingPlanItem", 'String'>
    readonly trainingPlanId: FieldRef<"TrainingPlanItem", 'String'>
    readonly planDate: FieldRef<"TrainingPlanItem", 'DateTime'>
    readonly workoutType: FieldRef<"TrainingPlanItem", 'String'>
    readonly distanceKm: FieldRef<"TrainingPlanItem", 'Float'>
    readonly targetPaceSecPerKm: FieldRef<"TrainingPlanItem", 'Int'>
    readonly description: FieldRef<"TrainingPlanItem", 'String'>
    readonly sortOrder: FieldRef<"TrainingPlanItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TrainingPlanItem findUnique
   */
  export type TrainingPlanItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanItem to fetch.
     */
    where: TrainingPlanItemWhereUniqueInput
  }

  /**
   * TrainingPlanItem findUniqueOrThrow
   */
  export type TrainingPlanItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanItem to fetch.
     */
    where: TrainingPlanItemWhereUniqueInput
  }

  /**
   * TrainingPlanItem findFirst
   */
  export type TrainingPlanItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanItem to fetch.
     */
    where?: TrainingPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanItems to fetch.
     */
    orderBy?: TrainingPlanItemOrderByWithRelationInput | TrainingPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlanItems.
     */
    cursor?: TrainingPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlanItems.
     */
    distinct?: TrainingPlanItemScalarFieldEnum | TrainingPlanItemScalarFieldEnum[]
  }

  /**
   * TrainingPlanItem findFirstOrThrow
   */
  export type TrainingPlanItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanItem to fetch.
     */
    where?: TrainingPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanItems to fetch.
     */
    orderBy?: TrainingPlanItemOrderByWithRelationInput | TrainingPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrainingPlanItems.
     */
    cursor?: TrainingPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlanItems.
     */
    distinct?: TrainingPlanItemScalarFieldEnum | TrainingPlanItemScalarFieldEnum[]
  }

  /**
   * TrainingPlanItem findMany
   */
  export type TrainingPlanItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter, which TrainingPlanItems to fetch.
     */
    where?: TrainingPlanItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrainingPlanItems to fetch.
     */
    orderBy?: TrainingPlanItemOrderByWithRelationInput | TrainingPlanItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrainingPlanItems.
     */
    cursor?: TrainingPlanItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrainingPlanItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrainingPlanItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrainingPlanItems.
     */
    distinct?: TrainingPlanItemScalarFieldEnum | TrainingPlanItemScalarFieldEnum[]
  }

  /**
   * TrainingPlanItem create
   */
  export type TrainingPlanItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to create a TrainingPlanItem.
     */
    data: XOR<TrainingPlanItemCreateInput, TrainingPlanItemUncheckedCreateInput>
  }

  /**
   * TrainingPlanItem createMany
   */
  export type TrainingPlanItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainingPlanItems.
     */
    data: TrainingPlanItemCreateManyInput | TrainingPlanItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrainingPlanItem createManyAndReturn
   */
  export type TrainingPlanItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * The data used to create many TrainingPlanItems.
     */
    data: TrainingPlanItemCreateManyInput | TrainingPlanItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlanItem update
   */
  export type TrainingPlanItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * The data needed to update a TrainingPlanItem.
     */
    data: XOR<TrainingPlanItemUpdateInput, TrainingPlanItemUncheckedUpdateInput>
    /**
     * Choose, which TrainingPlanItem to update.
     */
    where: TrainingPlanItemWhereUniqueInput
  }

  /**
   * TrainingPlanItem updateMany
   */
  export type TrainingPlanItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainingPlanItems.
     */
    data: XOR<TrainingPlanItemUpdateManyMutationInput, TrainingPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlanItems to update
     */
    where?: TrainingPlanItemWhereInput
    /**
     * Limit how many TrainingPlanItems to update.
     */
    limit?: number
  }

  /**
   * TrainingPlanItem updateManyAndReturn
   */
  export type TrainingPlanItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * The data used to update TrainingPlanItems.
     */
    data: XOR<TrainingPlanItemUpdateManyMutationInput, TrainingPlanItemUncheckedUpdateManyInput>
    /**
     * Filter which TrainingPlanItems to update
     */
    where?: TrainingPlanItemWhereInput
    /**
     * Limit how many TrainingPlanItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TrainingPlanItem upsert
   */
  export type TrainingPlanItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * The filter to search for the TrainingPlanItem to update in case it exists.
     */
    where: TrainingPlanItemWhereUniqueInput
    /**
     * In case the TrainingPlanItem found by the `where` argument doesn't exist, create a new TrainingPlanItem with this data.
     */
    create: XOR<TrainingPlanItemCreateInput, TrainingPlanItemUncheckedCreateInput>
    /**
     * In case the TrainingPlanItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrainingPlanItemUpdateInput, TrainingPlanItemUncheckedUpdateInput>
  }

  /**
   * TrainingPlanItem delete
   */
  export type TrainingPlanItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
    /**
     * Filter which TrainingPlanItem to delete.
     */
    where: TrainingPlanItemWhereUniqueInput
  }

  /**
   * TrainingPlanItem deleteMany
   */
  export type TrainingPlanItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrainingPlanItems to delete
     */
    where?: TrainingPlanItemWhereInput
    /**
     * Limit how many TrainingPlanItems to delete.
     */
    limit?: number
  }

  /**
   * TrainingPlanItem without action
   */
  export type TrainingPlanItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainingPlanItem
     */
    select?: TrainingPlanItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrainingPlanItem
     */
    omit?: TrainingPlanItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrainingPlanItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    nickname: 'nickname',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RunningRecordScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    distanceKm: 'distanceKm',
    durationSec: 'durationSec',
    paceSecPerKm: 'paceSecPerKm',
    runDate: 'runDate',
    memo: 'memo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RunningRecordScalarFieldEnum = (typeof RunningRecordScalarFieldEnum)[keyof typeof RunningRecordScalarFieldEnum]


  export const TrainingPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    goalType: 'goalType',
    level: 'level',
    startDate: 'startDate',
    endDate: 'endDate',
    sourceType: 'sourceType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TrainingPlanScalarFieldEnum = (typeof TrainingPlanScalarFieldEnum)[keyof typeof TrainingPlanScalarFieldEnum]


  export const TrainingPlanItemScalarFieldEnum: {
    id: 'id',
    trainingPlanId: 'trainingPlanId',
    planDate: 'planDate',
    workoutType: 'workoutType',
    distanceKm: 'distanceKm',
    targetPaceSecPerKm: 'targetPaceSecPerKm',
    description: 'description',
    sortOrder: 'sortOrder'
  };

  export type TrainingPlanItemScalarFieldEnum = (typeof TrainingPlanItemScalarFieldEnum)[keyof typeof TrainingPlanItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    nickname?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    runningRecords?: RunningRecordListRelationFilter
    trainingPlans?: TrainingPlanListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    nickname?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    runningRecords?: RunningRecordOrderByRelationAggregateInput
    trainingPlans?: TrainingPlanOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    nickname?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    runningRecords?: RunningRecordListRelationFilter
    trainingPlans?: TrainingPlanListRelationFilter
  }, "id" | "email" | "nickname">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    nickname?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RunningRecordWhereInput = {
    AND?: RunningRecordWhereInput | RunningRecordWhereInput[]
    OR?: RunningRecordWhereInput[]
    NOT?: RunningRecordWhereInput | RunningRecordWhereInput[]
    id?: StringFilter<"RunningRecord"> | string
    userId?: IntFilter<"RunningRecord"> | number
    distanceKm?: FloatFilter<"RunningRecord"> | number
    durationSec?: IntFilter<"RunningRecord"> | number
    paceSecPerKm?: IntFilter<"RunningRecord"> | number
    runDate?: DateTimeFilter<"RunningRecord"> | Date | string
    memo?: StringNullableFilter<"RunningRecord"> | string | null
    createdAt?: DateTimeFilter<"RunningRecord"> | Date | string
    updatedAt?: DateTimeFilter<"RunningRecord"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RunningRecordOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
    runDate?: SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RunningRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RunningRecordWhereInput | RunningRecordWhereInput[]
    OR?: RunningRecordWhereInput[]
    NOT?: RunningRecordWhereInput | RunningRecordWhereInput[]
    userId?: IntFilter<"RunningRecord"> | number
    distanceKm?: FloatFilter<"RunningRecord"> | number
    durationSec?: IntFilter<"RunningRecord"> | number
    paceSecPerKm?: IntFilter<"RunningRecord"> | number
    runDate?: DateTimeFilter<"RunningRecord"> | Date | string
    memo?: StringNullableFilter<"RunningRecord"> | string | null
    createdAt?: DateTimeFilter<"RunningRecord"> | Date | string
    updatedAt?: DateTimeFilter<"RunningRecord"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RunningRecordOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
    runDate?: SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RunningRecordCountOrderByAggregateInput
    _avg?: RunningRecordAvgOrderByAggregateInput
    _max?: RunningRecordMaxOrderByAggregateInput
    _min?: RunningRecordMinOrderByAggregateInput
    _sum?: RunningRecordSumOrderByAggregateInput
  }

  export type RunningRecordScalarWhereWithAggregatesInput = {
    AND?: RunningRecordScalarWhereWithAggregatesInput | RunningRecordScalarWhereWithAggregatesInput[]
    OR?: RunningRecordScalarWhereWithAggregatesInput[]
    NOT?: RunningRecordScalarWhereWithAggregatesInput | RunningRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RunningRecord"> | string
    userId?: IntWithAggregatesFilter<"RunningRecord"> | number
    distanceKm?: FloatWithAggregatesFilter<"RunningRecord"> | number
    durationSec?: IntWithAggregatesFilter<"RunningRecord"> | number
    paceSecPerKm?: IntWithAggregatesFilter<"RunningRecord"> | number
    runDate?: DateTimeWithAggregatesFilter<"RunningRecord"> | Date | string
    memo?: StringNullableWithAggregatesFilter<"RunningRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RunningRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RunningRecord"> | Date | string
  }

  export type TrainingPlanWhereInput = {
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    userId?: IntFilter<"TrainingPlan"> | number
    title?: StringFilter<"TrainingPlan"> | string
    goalType?: StringFilter<"TrainingPlan"> | string
    level?: StringFilter<"TrainingPlan"> | string
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    sourceType?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: TrainingPlanItemListRelationFilter
  }

  export type TrainingPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    goalType?: SortOrder
    level?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: TrainingPlanItemOrderByRelationAggregateInput
  }

  export type TrainingPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    OR?: TrainingPlanWhereInput[]
    NOT?: TrainingPlanWhereInput | TrainingPlanWhereInput[]
    userId?: IntFilter<"TrainingPlan"> | number
    title?: StringFilter<"TrainingPlan"> | string
    goalType?: StringFilter<"TrainingPlan"> | string
    level?: StringFilter<"TrainingPlan"> | string
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    sourceType?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: TrainingPlanItemListRelationFilter
  }, "id">

  export type TrainingPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    goalType?: SortOrder
    level?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TrainingPlanCountOrderByAggregateInput
    _avg?: TrainingPlanAvgOrderByAggregateInput
    _max?: TrainingPlanMaxOrderByAggregateInput
    _min?: TrainingPlanMinOrderByAggregateInput
    _sum?: TrainingPlanSumOrderByAggregateInput
  }

  export type TrainingPlanScalarWhereWithAggregatesInput = {
    AND?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    OR?: TrainingPlanScalarWhereWithAggregatesInput[]
    NOT?: TrainingPlanScalarWhereWithAggregatesInput | TrainingPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingPlan"> | string
    userId?: IntWithAggregatesFilter<"TrainingPlan"> | number
    title?: StringWithAggregatesFilter<"TrainingPlan"> | string
    goalType?: StringWithAggregatesFilter<"TrainingPlan"> | string
    level?: StringWithAggregatesFilter<"TrainingPlan"> | string
    startDate?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    sourceType?: StringWithAggregatesFilter<"TrainingPlan"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TrainingPlan"> | Date | string
  }

  export type TrainingPlanItemWhereInput = {
    AND?: TrainingPlanItemWhereInput | TrainingPlanItemWhereInput[]
    OR?: TrainingPlanItemWhereInput[]
    NOT?: TrainingPlanItemWhereInput | TrainingPlanItemWhereInput[]
    id?: StringFilter<"TrainingPlanItem"> | string
    trainingPlanId?: StringFilter<"TrainingPlanItem"> | string
    planDate?: DateTimeFilter<"TrainingPlanItem"> | Date | string
    workoutType?: StringFilter<"TrainingPlanItem"> | string
    distanceKm?: FloatNullableFilter<"TrainingPlanItem"> | number | null
    targetPaceSecPerKm?: IntNullableFilter<"TrainingPlanItem"> | number | null
    description?: StringNullableFilter<"TrainingPlanItem"> | string | null
    sortOrder?: IntFilter<"TrainingPlanItem"> | number
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
  }

  export type TrainingPlanItemOrderByWithRelationInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    planDate?: SortOrder
    workoutType?: SortOrder
    distanceKm?: SortOrderInput | SortOrder
    targetPaceSecPerKm?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    trainingPlan?: TrainingPlanOrderByWithRelationInput
  }

  export type TrainingPlanItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrainingPlanItemWhereInput | TrainingPlanItemWhereInput[]
    OR?: TrainingPlanItemWhereInput[]
    NOT?: TrainingPlanItemWhereInput | TrainingPlanItemWhereInput[]
    trainingPlanId?: StringFilter<"TrainingPlanItem"> | string
    planDate?: DateTimeFilter<"TrainingPlanItem"> | Date | string
    workoutType?: StringFilter<"TrainingPlanItem"> | string
    distanceKm?: FloatNullableFilter<"TrainingPlanItem"> | number | null
    targetPaceSecPerKm?: IntNullableFilter<"TrainingPlanItem"> | number | null
    description?: StringNullableFilter<"TrainingPlanItem"> | string | null
    sortOrder?: IntFilter<"TrainingPlanItem"> | number
    trainingPlan?: XOR<TrainingPlanScalarRelationFilter, TrainingPlanWhereInput>
  }, "id">

  export type TrainingPlanItemOrderByWithAggregationInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    planDate?: SortOrder
    workoutType?: SortOrder
    distanceKm?: SortOrderInput | SortOrder
    targetPaceSecPerKm?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    _count?: TrainingPlanItemCountOrderByAggregateInput
    _avg?: TrainingPlanItemAvgOrderByAggregateInput
    _max?: TrainingPlanItemMaxOrderByAggregateInput
    _min?: TrainingPlanItemMinOrderByAggregateInput
    _sum?: TrainingPlanItemSumOrderByAggregateInput
  }

  export type TrainingPlanItemScalarWhereWithAggregatesInput = {
    AND?: TrainingPlanItemScalarWhereWithAggregatesInput | TrainingPlanItemScalarWhereWithAggregatesInput[]
    OR?: TrainingPlanItemScalarWhereWithAggregatesInput[]
    NOT?: TrainingPlanItemScalarWhereWithAggregatesInput | TrainingPlanItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrainingPlanItem"> | string
    trainingPlanId?: StringWithAggregatesFilter<"TrainingPlanItem"> | string
    planDate?: DateTimeWithAggregatesFilter<"TrainingPlanItem"> | Date | string
    workoutType?: StringWithAggregatesFilter<"TrainingPlanItem"> | string
    distanceKm?: FloatNullableWithAggregatesFilter<"TrainingPlanItem"> | number | null
    targetPaceSecPerKm?: IntNullableWithAggregatesFilter<"TrainingPlanItem"> | number | null
    description?: StringNullableWithAggregatesFilter<"TrainingPlanItem"> | string | null
    sortOrder?: IntWithAggregatesFilter<"TrainingPlanItem"> | number
  }

  export type UserCreateInput = {
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runningRecords?: RunningRecordCreateNestedManyWithoutUserInput
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runningRecords?: RunningRecordUncheckedCreateNestedManyWithoutUserInput
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runningRecords?: RunningRecordUpdateManyWithoutUserNestedInput
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runningRecords?: RunningRecordUncheckedUpdateManyWithoutUserNestedInput
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordCreateInput = {
    id?: string
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRunningRecordsInput
  }

  export type RunningRecordUncheckedCreateInput = {
    id?: string
    userId: number
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunningRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRunningRecordsNestedInput
  }

  export type RunningRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordCreateManyInput = {
    id?: string
    userId: number
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunningRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanCreateInput = {
    id?: string
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingPlansInput
    items?: TrainingPlanItemCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateInput = {
    id?: string
    userId: number
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TrainingPlanItemUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
    items?: TrainingPlanItemUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TrainingPlanItemUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanCreateManyInput = {
    id?: string
    userId: number
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanItemCreateInput = {
    id?: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
    trainingPlan: TrainingPlanCreateNestedOneWithoutItemsInput
  }

  export type TrainingPlanItemUncheckedCreateInput = {
    id?: string
    trainingPlanId: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
  }

  export type TrainingPlanItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    trainingPlan?: TrainingPlanUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TrainingPlanItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TrainingPlanItemCreateManyInput = {
    id?: string
    trainingPlanId: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
  }

  export type TrainingPlanItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TrainingPlanItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trainingPlanId?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RunningRecordListRelationFilter = {
    every?: RunningRecordWhereInput
    some?: RunningRecordWhereInput
    none?: RunningRecordWhereInput
  }

  export type TrainingPlanListRelationFilter = {
    every?: TrainingPlanWhereInput
    some?: TrainingPlanWhereInput
    none?: TrainingPlanWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RunningRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    nickname?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    nickname?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    nickname?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RunningRecordCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
    runDate?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RunningRecordAvgOrderByAggregateInput = {
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
  }

  export type RunningRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
    runDate?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RunningRecordMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
    runDate?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RunningRecordSumOrderByAggregateInput = {
    userId?: SortOrder
    distanceKm?: SortOrder
    durationSec?: SortOrder
    paceSecPerKm?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type TrainingPlanItemListRelationFilter = {
    every?: TrainingPlanItemWhereInput
    some?: TrainingPlanItemWhereInput
    none?: TrainingPlanItemWhereInput
  }

  export type TrainingPlanItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrainingPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    goalType?: SortOrder
    level?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type TrainingPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    goalType?: SortOrder
    level?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    goalType?: SortOrder
    level?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    sourceType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TrainingPlanSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TrainingPlanScalarRelationFilter = {
    is?: TrainingPlanWhereInput
    isNot?: TrainingPlanWhereInput
  }

  export type TrainingPlanItemCountOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    planDate?: SortOrder
    workoutType?: SortOrder
    distanceKm?: SortOrder
    targetPaceSecPerKm?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
  }

  export type TrainingPlanItemAvgOrderByAggregateInput = {
    distanceKm?: SortOrder
    targetPaceSecPerKm?: SortOrder
    sortOrder?: SortOrder
  }

  export type TrainingPlanItemMaxOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    planDate?: SortOrder
    workoutType?: SortOrder
    distanceKm?: SortOrder
    targetPaceSecPerKm?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
  }

  export type TrainingPlanItemMinOrderByAggregateInput = {
    id?: SortOrder
    trainingPlanId?: SortOrder
    planDate?: SortOrder
    workoutType?: SortOrder
    distanceKm?: SortOrder
    targetPaceSecPerKm?: SortOrder
    description?: SortOrder
    sortOrder?: SortOrder
  }

  export type TrainingPlanItemSumOrderByAggregateInput = {
    distanceKm?: SortOrder
    targetPaceSecPerKm?: SortOrder
    sortOrder?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RunningRecordCreateNestedManyWithoutUserInput = {
    create?: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput> | RunningRecordCreateWithoutUserInput[] | RunningRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RunningRecordCreateOrConnectWithoutUserInput | RunningRecordCreateOrConnectWithoutUserInput[]
    createMany?: RunningRecordCreateManyUserInputEnvelope
    connect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
  }

  export type TrainingPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type RunningRecordUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput> | RunningRecordCreateWithoutUserInput[] | RunningRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RunningRecordCreateOrConnectWithoutUserInput | RunningRecordCreateOrConnectWithoutUserInput[]
    createMany?: RunningRecordCreateManyUserInputEnvelope
    connect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
  }

  export type TrainingPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RunningRecordUpdateManyWithoutUserNestedInput = {
    create?: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput> | RunningRecordCreateWithoutUserInput[] | RunningRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RunningRecordCreateOrConnectWithoutUserInput | RunningRecordCreateOrConnectWithoutUserInput[]
    upsert?: RunningRecordUpsertWithWhereUniqueWithoutUserInput | RunningRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RunningRecordCreateManyUserInputEnvelope
    set?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    disconnect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    delete?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    connect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    update?: RunningRecordUpdateWithWhereUniqueWithoutUserInput | RunningRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RunningRecordUpdateManyWithWhereWithoutUserInput | RunningRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RunningRecordScalarWhereInput | RunningRecordScalarWhereInput[]
  }

  export type TrainingPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RunningRecordUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput> | RunningRecordCreateWithoutUserInput[] | RunningRecordUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RunningRecordCreateOrConnectWithoutUserInput | RunningRecordCreateOrConnectWithoutUserInput[]
    upsert?: RunningRecordUpsertWithWhereUniqueWithoutUserInput | RunningRecordUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RunningRecordCreateManyUserInputEnvelope
    set?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    disconnect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    delete?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    connect?: RunningRecordWhereUniqueInput | RunningRecordWhereUniqueInput[]
    update?: RunningRecordUpdateWithWhereUniqueWithoutUserInput | RunningRecordUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RunningRecordUpdateManyWithWhereWithoutUserInput | RunningRecordUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RunningRecordScalarWhereInput | RunningRecordScalarWhereInput[]
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput> | TrainingPlanCreateWithoutUserInput[] | TrainingPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutUserInput | TrainingPlanCreateOrConnectWithoutUserInput[]
    upsert?: TrainingPlanUpsertWithWhereUniqueWithoutUserInput | TrainingPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TrainingPlanCreateManyUserInputEnvelope
    set?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    disconnect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    delete?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    connect?: TrainingPlanWhereUniqueInput | TrainingPlanWhereUniqueInput[]
    update?: TrainingPlanUpdateWithWhereUniqueWithoutUserInput | TrainingPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TrainingPlanUpdateManyWithWhereWithoutUserInput | TrainingPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRunningRecordsInput = {
    create?: XOR<UserCreateWithoutRunningRecordsInput, UserUncheckedCreateWithoutRunningRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRunningRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRunningRecordsNestedInput = {
    create?: XOR<UserCreateWithoutRunningRecordsInput, UserUncheckedCreateWithoutRunningRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRunningRecordsInput
    upsert?: UserUpsertWithoutRunningRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRunningRecordsInput, UserUpdateWithoutRunningRecordsInput>, UserUncheckedUpdateWithoutRunningRecordsInput>
  }

  export type UserCreateNestedOneWithoutTrainingPlansInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TrainingPlanItemCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanItemCreateWithoutTrainingPlanInput[] | TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput | TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingPlanItemCreateManyTrainingPlanInputEnvelope
    connect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
  }

  export type TrainingPlanItemUncheckedCreateNestedManyWithoutTrainingPlanInput = {
    create?: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanItemCreateWithoutTrainingPlanInput[] | TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput | TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput[]
    createMany?: TrainingPlanItemCreateManyTrainingPlanInputEnvelope
    connect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTrainingPlansNestedInput = {
    create?: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTrainingPlansInput
    upsert?: UserUpsertWithoutTrainingPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTrainingPlansInput, UserUpdateWithoutTrainingPlansInput>, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type TrainingPlanItemUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanItemCreateWithoutTrainingPlanInput[] | TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput | TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingPlanItemUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanItemUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingPlanItemCreateManyTrainingPlanInputEnvelope
    set?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    disconnect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    delete?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    connect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    update?: TrainingPlanItemUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanItemUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingPlanItemUpdateManyWithWhereWithoutTrainingPlanInput | TrainingPlanItemUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingPlanItemScalarWhereInput | TrainingPlanItemScalarWhereInput[]
  }

  export type TrainingPlanItemUncheckedUpdateManyWithoutTrainingPlanNestedInput = {
    create?: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput> | TrainingPlanItemCreateWithoutTrainingPlanInput[] | TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput[]
    connectOrCreate?: TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput | TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput[]
    upsert?: TrainingPlanItemUpsertWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanItemUpsertWithWhereUniqueWithoutTrainingPlanInput[]
    createMany?: TrainingPlanItemCreateManyTrainingPlanInputEnvelope
    set?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    disconnect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    delete?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    connect?: TrainingPlanItemWhereUniqueInput | TrainingPlanItemWhereUniqueInput[]
    update?: TrainingPlanItemUpdateWithWhereUniqueWithoutTrainingPlanInput | TrainingPlanItemUpdateWithWhereUniqueWithoutTrainingPlanInput[]
    updateMany?: TrainingPlanItemUpdateManyWithWhereWithoutTrainingPlanInput | TrainingPlanItemUpdateManyWithWhereWithoutTrainingPlanInput[]
    deleteMany?: TrainingPlanItemScalarWhereInput | TrainingPlanItemScalarWhereInput[]
  }

  export type TrainingPlanCreateNestedOneWithoutItemsInput = {
    create?: XOR<TrainingPlanCreateWithoutItemsInput, TrainingPlanUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutItemsInput
    connect?: TrainingPlanWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TrainingPlanUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<TrainingPlanCreateWithoutItemsInput, TrainingPlanUncheckedCreateWithoutItemsInput>
    connectOrCreate?: TrainingPlanCreateOrConnectWithoutItemsInput
    upsert?: TrainingPlanUpsertWithoutItemsInput
    connect?: TrainingPlanWhereUniqueInput
    update?: XOR<XOR<TrainingPlanUpdateToOneWithWhereWithoutItemsInput, TrainingPlanUpdateWithoutItemsInput>, TrainingPlanUncheckedUpdateWithoutItemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RunningRecordCreateWithoutUserInput = {
    id?: string
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunningRecordUncheckedCreateWithoutUserInput = {
    id?: string
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunningRecordCreateOrConnectWithoutUserInput = {
    where: RunningRecordWhereUniqueInput
    create: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput>
  }

  export type RunningRecordCreateManyUserInputEnvelope = {
    data: RunningRecordCreateManyUserInput | RunningRecordCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TrainingPlanCreateWithoutUserInput = {
    id?: string
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TrainingPlanItemCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: TrainingPlanItemUncheckedCreateNestedManyWithoutTrainingPlanInput
  }

  export type TrainingPlanCreateOrConnectWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanCreateManyUserInputEnvelope = {
    data: TrainingPlanCreateManyUserInput | TrainingPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RunningRecordUpsertWithWhereUniqueWithoutUserInput = {
    where: RunningRecordWhereUniqueInput
    update: XOR<RunningRecordUpdateWithoutUserInput, RunningRecordUncheckedUpdateWithoutUserInput>
    create: XOR<RunningRecordCreateWithoutUserInput, RunningRecordUncheckedCreateWithoutUserInput>
  }

  export type RunningRecordUpdateWithWhereUniqueWithoutUserInput = {
    where: RunningRecordWhereUniqueInput
    data: XOR<RunningRecordUpdateWithoutUserInput, RunningRecordUncheckedUpdateWithoutUserInput>
  }

  export type RunningRecordUpdateManyWithWhereWithoutUserInput = {
    where: RunningRecordScalarWhereInput
    data: XOR<RunningRecordUpdateManyMutationInput, RunningRecordUncheckedUpdateManyWithoutUserInput>
  }

  export type RunningRecordScalarWhereInput = {
    AND?: RunningRecordScalarWhereInput | RunningRecordScalarWhereInput[]
    OR?: RunningRecordScalarWhereInput[]
    NOT?: RunningRecordScalarWhereInput | RunningRecordScalarWhereInput[]
    id?: StringFilter<"RunningRecord"> | string
    userId?: IntFilter<"RunningRecord"> | number
    distanceKm?: FloatFilter<"RunningRecord"> | number
    durationSec?: IntFilter<"RunningRecord"> | number
    paceSecPerKm?: IntFilter<"RunningRecord"> | number
    runDate?: DateTimeFilter<"RunningRecord"> | Date | string
    memo?: StringNullableFilter<"RunningRecord"> | string | null
    createdAt?: DateTimeFilter<"RunningRecord"> | Date | string
    updatedAt?: DateTimeFilter<"RunningRecord"> | Date | string
  }

  export type TrainingPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    update: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
    create: XOR<TrainingPlanCreateWithoutUserInput, TrainingPlanUncheckedCreateWithoutUserInput>
  }

  export type TrainingPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: TrainingPlanWhereUniqueInput
    data: XOR<TrainingPlanUpdateWithoutUserInput, TrainingPlanUncheckedUpdateWithoutUserInput>
  }

  export type TrainingPlanUpdateManyWithWhereWithoutUserInput = {
    where: TrainingPlanScalarWhereInput
    data: XOR<TrainingPlanUpdateManyMutationInput, TrainingPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type TrainingPlanScalarWhereInput = {
    AND?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    OR?: TrainingPlanScalarWhereInput[]
    NOT?: TrainingPlanScalarWhereInput | TrainingPlanScalarWhereInput[]
    id?: StringFilter<"TrainingPlan"> | string
    userId?: IntFilter<"TrainingPlan"> | number
    title?: StringFilter<"TrainingPlan"> | string
    goalType?: StringFilter<"TrainingPlan"> | string
    level?: StringFilter<"TrainingPlan"> | string
    startDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    endDate?: DateTimeFilter<"TrainingPlan"> | Date | string
    sourceType?: StringFilter<"TrainingPlan"> | string
    createdAt?: DateTimeFilter<"TrainingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TrainingPlan"> | Date | string
  }

  export type UserCreateWithoutRunningRecordsInput = {
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlans?: TrainingPlanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRunningRecordsInput = {
    id?: number
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    trainingPlans?: TrainingPlanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRunningRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRunningRecordsInput, UserUncheckedCreateWithoutRunningRecordsInput>
  }

  export type UserUpsertWithoutRunningRecordsInput = {
    update: XOR<UserUpdateWithoutRunningRecordsInput, UserUncheckedUpdateWithoutRunningRecordsInput>
    create: XOR<UserCreateWithoutRunningRecordsInput, UserUncheckedCreateWithoutRunningRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRunningRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRunningRecordsInput, UserUncheckedUpdateWithoutRunningRecordsInput>
  }

  export type UserUpdateWithoutRunningRecordsInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlans?: TrainingPlanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRunningRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trainingPlans?: TrainingPlanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTrainingPlansInput = {
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runningRecords?: RunningRecordCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTrainingPlansInput = {
    id?: number
    email: string
    passwordHash: string
    nickname?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runningRecords?: RunningRecordUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTrainingPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
  }

  export type TrainingPlanItemCreateWithoutTrainingPlanInput = {
    id?: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
  }

  export type TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput = {
    id?: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
  }

  export type TrainingPlanItemCreateOrConnectWithoutTrainingPlanInput = {
    where: TrainingPlanItemWhereUniqueInput
    create: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingPlanItemCreateManyTrainingPlanInputEnvelope = {
    data: TrainingPlanItemCreateManyTrainingPlanInput | TrainingPlanItemCreateManyTrainingPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTrainingPlansInput = {
    update: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
    create: XOR<UserCreateWithoutTrainingPlansInput, UserUncheckedCreateWithoutTrainingPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTrainingPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTrainingPlansInput, UserUncheckedUpdateWithoutTrainingPlansInput>
  }

  export type UserUpdateWithoutTrainingPlansInput = {
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runningRecords?: RunningRecordUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTrainingPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    nickname?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runningRecords?: RunningRecordUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrainingPlanItemUpsertWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingPlanItemWhereUniqueInput
    update: XOR<TrainingPlanItemUpdateWithoutTrainingPlanInput, TrainingPlanItemUncheckedUpdateWithoutTrainingPlanInput>
    create: XOR<TrainingPlanItemCreateWithoutTrainingPlanInput, TrainingPlanItemUncheckedCreateWithoutTrainingPlanInput>
  }

  export type TrainingPlanItemUpdateWithWhereUniqueWithoutTrainingPlanInput = {
    where: TrainingPlanItemWhereUniqueInput
    data: XOR<TrainingPlanItemUpdateWithoutTrainingPlanInput, TrainingPlanItemUncheckedUpdateWithoutTrainingPlanInput>
  }

  export type TrainingPlanItemUpdateManyWithWhereWithoutTrainingPlanInput = {
    where: TrainingPlanItemScalarWhereInput
    data: XOR<TrainingPlanItemUpdateManyMutationInput, TrainingPlanItemUncheckedUpdateManyWithoutTrainingPlanInput>
  }

  export type TrainingPlanItemScalarWhereInput = {
    AND?: TrainingPlanItemScalarWhereInput | TrainingPlanItemScalarWhereInput[]
    OR?: TrainingPlanItemScalarWhereInput[]
    NOT?: TrainingPlanItemScalarWhereInput | TrainingPlanItemScalarWhereInput[]
    id?: StringFilter<"TrainingPlanItem"> | string
    trainingPlanId?: StringFilter<"TrainingPlanItem"> | string
    planDate?: DateTimeFilter<"TrainingPlanItem"> | Date | string
    workoutType?: StringFilter<"TrainingPlanItem"> | string
    distanceKm?: FloatNullableFilter<"TrainingPlanItem"> | number | null
    targetPaceSecPerKm?: IntNullableFilter<"TrainingPlanItem"> | number | null
    description?: StringNullableFilter<"TrainingPlanItem"> | string | null
    sortOrder?: IntFilter<"TrainingPlanItem"> | number
  }

  export type TrainingPlanCreateWithoutItemsInput = {
    id?: string
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTrainingPlansInput
  }

  export type TrainingPlanUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: number
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanCreateOrConnectWithoutItemsInput = {
    where: TrainingPlanWhereUniqueInput
    create: XOR<TrainingPlanCreateWithoutItemsInput, TrainingPlanUncheckedCreateWithoutItemsInput>
  }

  export type TrainingPlanUpsertWithoutItemsInput = {
    update: XOR<TrainingPlanUpdateWithoutItemsInput, TrainingPlanUncheckedUpdateWithoutItemsInput>
    create: XOR<TrainingPlanCreateWithoutItemsInput, TrainingPlanUncheckedCreateWithoutItemsInput>
    where?: TrainingPlanWhereInput
  }

  export type TrainingPlanUpdateToOneWithWhereWithoutItemsInput = {
    where?: TrainingPlanWhereInput
    data: XOR<TrainingPlanUpdateWithoutItemsInput, TrainingPlanUncheckedUpdateWithoutItemsInput>
  }

  export type TrainingPlanUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTrainingPlansNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordCreateManyUserInput = {
    id?: string
    distanceKm: number
    durationSec: number
    paceSecPerKm: number
    runDate: Date | string
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrainingPlanCreateManyUserInput = {
    id?: string
    title: string
    goalType: string
    level: string
    startDate: Date | string
    endDate: Date | string
    sourceType: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RunningRecordUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RunningRecordUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    distanceKm?: FloatFieldUpdateOperationsInput | number
    durationSec?: IntFieldUpdateOperationsInput | number
    paceSecPerKm?: IntFieldUpdateOperationsInput | number
    runDate?: DateTimeFieldUpdateOperationsInput | Date | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TrainingPlanItemUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TrainingPlanItemUncheckedUpdateManyWithoutTrainingPlanNestedInput
  }

  export type TrainingPlanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    goalType?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrainingPlanItemCreateManyTrainingPlanInput = {
    id?: string
    planDate: Date | string
    workoutType: string
    distanceKm?: number | null
    targetPaceSecPerKm?: number | null
    description?: string | null
    sortOrder: number
  }

  export type TrainingPlanItemUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TrainingPlanItemUncheckedUpdateWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type TrainingPlanItemUncheckedUpdateManyWithoutTrainingPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    planDate?: DateTimeFieldUpdateOperationsInput | Date | string
    workoutType?: StringFieldUpdateOperationsInput | string
    distanceKm?: NullableFloatFieldUpdateOperationsInput | number | null
    targetPaceSecPerKm?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}