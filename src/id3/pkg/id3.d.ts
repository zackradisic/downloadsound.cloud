/* tslint:disable */
/* eslint-disable */
/**
*/
export class ID3Tag {
  free(): void;
/**
* @returns {ID3Tag}
*/
  static new(): ID3Tag;
/**
* @param {Uint8Array} image
* @param {string} title
* @param {string} artist
* @returns {Uint8Array}
*/
  create_tag(image: Uint8Array, title: string, artist: string): Uint8Array;
}
