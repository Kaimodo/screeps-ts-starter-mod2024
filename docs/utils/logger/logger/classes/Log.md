[**screeps-ts-starter-mod2024 v1.1.0**](../../../../README.md) • **Docs**

***

[screeps-ts-starter-mod2024 v1.1.0](../../../../modules.md) / [utils/logger/logger](../README.md) / Log

# Class: Log

The Logger provides a more detailed logs to the Screeps console, which
includes the tick number, as well as a link back to the source code (if
configured).

Log level and output can be controlled from console by setting `level`,
`showSource` and `showTick` properties on the global `log` object.

## Export

Log

## Constructors

### new Log()

> **new Log**(): [`Log`](Log.md)

#### Returns

[`Log`](Log.md)

## Properties

### sourceMap

> `static` **sourceMap**: `any`

#### Defined in

[utils/logger/logger.ts:96](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L96)

## Methods

### debug()

> **debug**(...`args`): `void`

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:155](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L155)

***

### error()

> **error**(...`args`): `void`

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:137](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L137)

***

### getFileLine()

> **getFileLine**(`upStack`): `string`

#### Parameters

• **upStack**: `number` = `4`

#### Returns

`string`

#### Defined in

[utils/logger/logger.ts:161](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L161)

***

### info()

> **info**(...`args`): `void`

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:149](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L149)

***

### print()

> **print**(`logLevel`, `message`): `void`

#### Parameters

• **logLevel**: [`LogLevel`](../../logLevel/enumerations/LogLevel.md)

• **message**: `string`

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:112](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L112)

***

### trace()

> **trace**(`error`): [`Log`](Log.md)

#### Parameters

• **error**: `Error`

#### Returns

[`Log`](Log.md)

#### Defined in

[utils/logger/logger.ts:129](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L129)

***

### warning()

> **warning**(...`args`): `void`

#### Parameters

• ...**args**: `any`[]

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:143](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L143)

***

### loadSourceMap()

> `static` **loadSourceMap**(): `void`

#### Returns

`void`

#### Defined in

[utils/logger/logger.ts:98](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/logger/logger.ts#L98)
