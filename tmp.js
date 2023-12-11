Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"stopMapper",{enumerable:true,get:function get(){return _mappers.stopMapper;}});exports.valueSetter=void 0;var _mappers=require("./mappers");var _worklet_16665543178482_init_data={code:"function valueSetter(sv, value) {\n  const previousAnimation = sv._animation;\n  if (previousAnimation) {\n    previousAnimation.cancelled = true;\n    sv._animation = null;\n  }\n  if (typeof value === 'function' || value !== null && typeof value === 'object' && value.onFrame !== undefined) {\n    const animation = typeof value === 'function' ? value() : value;\n    if (sv._value === animation.current && !animation.isHigherOrder) {\n      animation.callback && animation.callback(true);\n      return;\n    }\n    const initializeAnimation = function (timestamp) {\n      animation.onStart(animation, sv.value, timestamp, previousAnimation);\n    };\n    const currentTimestamp = global.__frameTimestamp || performance.now();\n    initializeAnimation(currentTimestamp);\n    const step = function (timestamp) {\n      if (animation.cancelled) {\n        animation.callback && animation.callback(false);\n        return;\n      }\n      const finished = animation.onFrame(animation, timestamp);\n      animation.finished = true;\n      animation.timestamp = timestamp;\n      sv._value = animation.current;\n      if (finished) {\n        animation.callback && animation.callback(true);\n      } else {\n        requestAnimationFrame(step);\n      }\n    };\n    sv._animation = animation;\n    step(currentTimestamp);\n  } else {\n    if (sv._value === value) {\n      return;\n    }\n    sv._value = value;\n  }\n}",location:"/Users/ryuheishima/workspace/products/react-native-reanimated-collapsible-header/example/node_modules/react-native-reanimated/src/reanimated2/valueSetter.ts",sourceMap:"{\"version\":3,\"names\":[\"valueSetter\",\"sv\",\"value\",\"previousAnimation\",\"_animation\",\"cancelled\",\"onFrame\",\"undefined\",\"animation\",\"_value\",\"current\",\"isHigherOrder\",\"callback\",\"initializeAnimation\",\"timestamp\",\"onStart\",\"currentTimestamp\",\"global\",\"__frameTimestamp\",\"performance\",\"now\",\"step\",\"finished\",\"requestAnimationFrame\"],\"sources\":[\"/Users/ryuheishima/workspace/products/react-native-reanimated-collapsible-header/example/node_modules/react-native-reanimated/src/reanimated2/valueSetter.ts\"],\"mappings\":\"AAIO,SAAAA,WAASA,CAAYC,EAAA,EAAOC,KAAE,EAAW;EAE9C,MAAMC,iBAAiB,GAAGF,EAAE,CAACG,UAAU;EACvC,IAAID,iBAAiB,EAAE;IACrBA,iBAAiB,CAACE,SAAS,GAAG,IAAI;IAClCJ,EAAE,CAACG,UAAU,GAAG,IAAI;EACtB;EACA,IACE,OAAOF,KAAK,KAAK,UAAU,IAC1BA,KAAK,KAAK,IAAI,IACb,OAAOA,KAAK,KAAK,QAAQ,IACxBA,KAAK,CAAqBI,OAAO,KAAKC,SAAU,EACnD;IACA,MAAMC,SAA0B,GAC9B,OAAON,KAAK,KAAK,UAAU,GACtBA,KAAK,CAA2B,CAAC,GACjCA,KAAyB;IAKhC,IAAID,EAAE,CAACQ,MAAM,KAAKD,SAAS,CAACE,OAAO,IAAI,CAACF,SAAS,CAACG,aAAa,EAAE;MAC/DH,SAAS,CAACI,QAAQ,IAAIJ,SAAS,CAACI,QAAQ,CAAC,IAAI,CAAC;MAC9C;IACF;IAEA,MAAMC,mBAAmB,GAAG,SAAAA,CAACC,SAAiB,EAAK;MACjDN,SAAS,CAACO,OAAO,CAACP,SAAS,EAAEP,EAAE,CAACC,KAAK,EAAEY,SAAS,EAAEX,iBAAiB,CAAC;IACtE,CAAC;IACD,MAAMa,gBAAgB,GAAGC,MAAM,CAACC,gBAAgB,IAAIC,WAAW,CAACC,GAAG,CAAC,CAAC;IACrEP,mBAAmB,CAACG,gBAAgB,CAAC;IACrC,MAAMK,IAAI,GAAG,SAAAA,CAACP,SAAiB,EAAK;MAClC,IAAIN,SAAS,CAACH,SAAS,EAAE;QACvBG,SAAS,CAACI,QAAQ,IAAIJ,SAAS,CAACI,QAAQ,CAAC,KAAoB,CAAC;QAC9D;MACF;MACA,MAAMU,QAAQ,GAAGd,SAAS,CAACF,OAAO,CAACE,SAAS,EAAEM,SAAS,CAAC;MACxDN,SAAS,CAACc,QAAQ,GAAG,IAAI;MACzBd,SAAS,CAACM,SAAS,GAAGA,SAAS;MAC/Bb,EAAE,CAACQ,MAAM,GAAGD,SAAS,CAACE,OAAO;MAC7B,IAAIY,QAAQ,EAAE;QACZd,SAAS,CAACI,QAAQ,IAAIJ,SAAS,CAACI,QAAQ,CAAC,IAAmB,CAAC;MAC/D,CAAC,MAAM;QACLW,qBAAqB,CAACF,IAAI,CAAC;MAC7B;IACF,CAAC;IAEDpB,EAAE,CAACG,UAAU,GAAGI,SAAS;IAEzBa,IAAI,CAACL,gBAAgB,CAAC;EACxB,CAAC,MAAM;IAGL,IAAIf,EAAE,CAACQ,MAAM,KAAKP,KAAK,EAAE;MACvB;IACF;IACAD,EAAE,CAACQ,MAAM,GAAGP,KAAqC;EACnD;AACF\"}"};var valueSetter=exports.valueSetter=function(){var _e=[new global.Error(),1,-27];var _f=function _f(sv,value){var previousAnimation=sv._animation;if(previousAnimation){previousAnimation.cancelled=true;sv._animation=null;}if(typeof value==='function'||value!==null&&typeof value==='object'&&value.onFrame!==undefined){var animation=typeof value==='function'?value():value;if(sv._value===animation.current&&!animation.isHigherOrder){animation.callback&&animation.callback(true);return;}var initializeAnimation=function initializeAnimation(timestamp){animation.onStart(animation,sv.value,timestamp,previousAnimation);};var currentTimestamp=global.__frameTimestamp||performance.now();initializeAnimation(currentTimestamp);var step=function step(timestamp){if(animation.cancelled){animation.callback&&animation.callback(false);return;}var finished=animation.onFrame(animation,timestamp);animation.finished=true;animation.timestamp=timestamp;sv._value=animation.current;if(finished){animation.callback&&animation.callback(true);}else{requestAnimationFrame(step);}};sv._animation=animation;step(currentTimestamp);}else{if(sv._value===value){return;}sv._value=value;}};_f._closure={};_f.__initData=_worklet_16665543178482_init_data;_f.__workletHash=16665543178482;_f.__stackDetails=_e;_f.__version="3.3.0";return _f;}();
