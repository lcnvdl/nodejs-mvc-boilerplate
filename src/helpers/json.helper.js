const JsonHelper={toB64:function(r){return"string"!=typeof r&&(r=JSON.stringify(r)),JsonHelper.btoa(r)},fromB64:function(r){var n=JsonHelper.atob(r);return JSON.parse(n)},stringFromB64:function(r){return JsonHelper.atob(r)},fromB64ToBuffer:function(r){return Buffer.from(r,"base64")},btoa:function(r){return Buffer.from(r,"binary").toString("base64")},atob:function(r){return Buffer.from(r,"base64").toString("binary")}};module.exports=JsonHelper;