import { Component } from '@angular/core';
import * as protobuf from 'protobufjs'
// awesome.json
const schema = `{
  "nested": {
    "PublicKeyDocumentType": {
      "fields": {
        "modulus": {
          "type": "bytes",
          "id": 1
        },
        "exponent": {
          "type": "bytes",
          "id": 2
        }
      }
    }
  }
}`;

const public_key = 'CoACsOxpg+FXjl1chCDGM5O04+VcQ0LFdd2ydorA+3UOi+T4rN0IW4wMgQbKz6cuJq+3az2tjWnoUiC8QVsMESPe2THuyIxU4IUiAkKkdm21CPe9KMfg/wVQ8Lc0ZR3UozehI7+ooObiAlWXB5bBYAyzxtHbt7zRBi2YehDWVTfCe0SCQQ4KBZq+JA9vB92KPqOwcrdV45xAzI8aqSSetVIyZIinuSakCjWcrM6dhjZK36E31YMtrC34P1LJIVjVl/eTDddtez79Klpqi2hgfVZUE5IHQb1fvqMlIxAyguRmAHwMWCQzCs51vfeI0myRy85SjbhBh2hvay+yVtjUNL361RIFA2qOPpE='

function bufferToBase64(buf) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

function base64ToBuffer(base64) {
    var binstr = atob(base64);
    var buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, i) {
      buf[i] = ch.charCodeAt(0);
    });
    return buf;
}

export function asciiToUint8Array(str) {
  const chars = [];
  for (let i = 0; i < str.length; ++i) {
    chars.push(str.charCodeAt(i));
  }
  return new Uint8Array(chars);
}

export function bytesToASCIIString(bytes) {
  return String.fromCharCode.apply(null, new Uint8Array(bytes));
}

console.log(99, new TextDecoder("utf-8").decode(new TextEncoder("utf-8").encode('příliš žluťoučký kůň')))

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor() {
    const root = protobuf.Root.fromJSON(JSON.parse(schema));
    const PublicKeyDocumentType = root.lookupType("PublicKeyDocumentType");

    // DECODE
    var buffer = base64ToBuffer(public_key);
    
    let decoded = PublicKeyDocumentType.decode(buffer);
    console.log(`decoded = ${JSON.stringify(decoded)}`);
    
    // ENCODE
    const encodedBuffer = PublicKeyDocumentType.encode(decoded).finish();

    console.log(111, bufferToBase64(encodedBuffer) === public_key)    
  }
}
