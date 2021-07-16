mod utils;

use std::io::BufWriter;

use bytes::BufMut;
use id3::{
    frame::{Picture, PictureType},
    Tag, Version,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct ID3Tag {}

#[wasm_bindgen]
impl ID3Tag {
    pub fn new() -> Self {
        Self {}
    }

    pub fn create_tag(
        &self,
        image: Vec<u8>,
        title: String,
        artist: String,
    ) -> Result<Vec<u8>, JsValue> {
        let mut tag = Tag::new();
        let buf = Vec::<u8>::new();
        let mut writer = BufWriter::new(buf);

        tag.set_title(title);
        tag.set_artist(artist);
        tag.add_picture(Picture {
            mime_type: "image/jpeg".to_owned(),
            description: "Song Artwork".to_owned(),
            data: image,
            picture_type: PictureType::BrightFish,
        });

        if let Err(err) = tag.write_to(&mut writer, Version::Id3v22) {
            return Err(JsValue::from(format!(
                "Failed to write tag to buffer {:?}",
                err
            )));
        }

        let buf = writer.into_inner().unwrap();
        Ok(buf.to_owned())
    }
}
