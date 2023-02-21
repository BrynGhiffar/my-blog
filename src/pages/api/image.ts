import { fstat, readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

type PostRequestBody = {
    image_url: string,
}
// var isArrayBufferSupported = (new Buffer(new Uint8Array([1]).buffer)[0] === 1);

// var arrayBufferToBuffer = isArrayBufferSupported ? arrayBufferToBufferAsArgument : arrayBufferToBufferCycle;

// function arrayBufferToBufferAsArgument(ab: ArrayBuffer) {
//   return new Buffer(ab);
// }

function toBuffer(ab: ArrayBuffer) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

function base64encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const { method } = request;
    const POST = "POST";
    if (method === POST) {
        const { image_url } = request.body as PostRequestBody;
        const options: RequestInit = {
            method: "GET",
            redirect: "follow"
        };
        const fetch_response = await fetch(image_url, options)
        const byte_array = new Uint8Array(await fetch_response.arrayBuffer());
        let string_arr: string[] = [];
        byte_array.forEach(byte =>  {
            string_arr.push(String.fromCharCode(byte));
        });
        const _base64 = btoa(string_arr.join(""));
        const base64 = `data:image/jpeg;base64,${_base64}`;
        return response.status(200).send(base64);
    }
}

export const config = {
  api: {
    externalResolver: true,
  },
}