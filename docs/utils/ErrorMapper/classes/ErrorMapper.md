[**screeps-ts-starter-mod2024 v1.1.0**](../../../README.md) • **Docs**

***

[screeps-ts-starter-mod2024 v1.1.0](../../../modules.md) / [utils/ErrorMapper](../README.md) / ErrorMapper

# Class: ErrorMapper

## Constructors

### new ErrorMapper()

> **new ErrorMapper**(): [`ErrorMapper`](ErrorMapper.md)

#### Returns

[`ErrorMapper`](ErrorMapper.md)

## Properties

### cache

> `static` **cache**: `object` = `{}`

#### Index Signature

 \[`key`: `string`\]: `string`

#### Defined in

[utils/ErrorMapper.ts:16](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/ErrorMapper.ts#L16)

## Accessors

### consumer

> `get` `static` **consumer**(): `SourceMapConsumer`

#### Returns

`SourceMapConsumer`

#### Defined in

[utils/ErrorMapper.ts:7](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/ErrorMapper.ts#L7)

## Methods

### sourceMappedStackTrace()

> `static` **sourceMappedStackTrace**(`error`): `string`

Generates a stack trace using a source map generate original symbol names.

WARNING - EXTREMELY high CPU cost for first call after reset - >30 CPU! Use sparingly!
(Consecutive calls after a reset are more reasonable, ~0.1 CPU/ea)

#### Parameters

• **error**: `string` \| `Error`

The error or original stack trace

#### Returns

`string`

The source-mapped stack trace

#### Defined in

[utils/ErrorMapper.ts:27](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/ErrorMapper.ts#L27)

***

### wrapLoop()

> `static` **wrapLoop**(`loop`): () => `void`

#### Parameters

• **loop**

#### Returns

`Function`

##### Returns

`void`

#### Defined in

[utils/ErrorMapper.ts:71](https://github.com/Kaimodo/screeps-ts-starter-mod2024/blob/a5b73b336d65167dfd0cbe18548fc5cecc5905cf/src/utils/ErrorMapper.ts#L71)
