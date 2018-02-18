# SubscribableEvent

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Microsoft/SubscribableEvent/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/subscribableevent.svg?style=flat-square)](https://www.npmjs.com/package/subscribableevent) [![Build Status](https://img.shields.io/travis/Microsoft/SubscribableEvent/master.svg?style=flat-square)](https://travis-ci.org/Microsoft/SubscribableEvent) [![David](https://img.shields.io/david/Microsoft/SubscribableEvent.svg?style=flat-square)](https://github.com/Microsoft/SubscribableEvent) [![David](https://img.shields.io/david/dev/Microsoft/SubscribableEvent.svg?style=flat-square)](https://github.com/Microsoft/SubscribableEvent)

A simple strongly-typed pub/sub/fire eventing system

## Basic Example

```typescript
const event = new SubscribableEvent<(payload: string) => void>(); 

event.subscribe((payload: string) => {
    console.log(payload);
});

event.fire('Payload Params');
```

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

