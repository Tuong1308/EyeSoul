// Product Photos for the seed: freely licensed images from Wikimedia Commons (each entry links its file page,
// which carries the author and full licence). Dev/demo data only; the admin will upload the shop's own photos.

type SeedPhoto = { url: string; licence: string; source: string };

export const PRODUCT_PHOTOS: Record<string, SeedPhoto[]> = {
  'fujifilm-x100vi': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Fujifilm_X100VI_25_may_2024b.jpg/960px-Fujifilm_X100VI_25_may_2024b.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Fujifilm_X100VI_25_may_2024b.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Fujifilm_X100VI_25_may_2024a.jpg/960px-Fujifilm_X100VI_25_may_2024a.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Fujifilm_X100VI_25_may_2024a.jpg' },
  ],
  'sony-a7-iv-body': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Sony_Alpha_7_Mark_IV.jpg/960px-Sony_Alpha_7_Mark_IV.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Sony_Alpha_7_Mark_IV.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Sony.alpha.7IV.G-Master.24-105mm.DSC00141.jpg/960px-Sony.alpha.7IV.G-Master.24-105mm.DSC00141.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Sony.alpha.7IV.G-Master.24-105mm.DSC00141.jpg' },
  ],
  'canon-eos-r8-kit-24-50': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Canon_EOS_R8_27_may_2023a.jpg/960px-Canon_EOS_R8_27_may_2023a.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Canon_EOS_R8_27_may_2023a.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Canon_EOS_R8_27_may_2023c.jpg/960px-Canon_EOS_R8_27_may_2023c.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Canon_EOS_R8_27_may_2023c.jpg' },
  ],
  'nikon-zf-body': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Nikon_Z_f_8_nov_2023a.jpg/960px-Nikon_Z_f_8_nov_2023a.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Nikon_Z_f_8_nov_2023a.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Nikon_Zf_silver.jpg/960px-Nikon_Zf_silver.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Nikon_Zf_silver.jpg' },
  ],
  'ricoh-gr-iiix': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/RICOH_GR_III_x_camera.jpg/960px-RICOH_GR_III_x_camera.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:RICOH_GR_III_x_camera.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Ricoh_GRIIIx.jpg/960px-Ricoh_GRIIIx.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Ricoh_GRIIIx.jpg' },
  ],
  'fujifilm-x-t50-kit-15-45': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Fujifilm_X-T50_25_may_2025b.jpg/960px-Fujifilm_X-T50_25_may_2025b.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Fujifilm_X-T50_25_may_2025b.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Fujifilm_X-T50_25_may_2025d.jpg/960px-Fujifilm_X-T50_25_may_2025d.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Fujifilm_X-T50_25_may_2025d.jpg' },
  ],
  'panasonic-lumix-s9-body': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Panasonic_Lumix_DC-S9_25_may_2024a.jpg/960px-Panasonic_Lumix_DC-S9_25_may_2024a.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Panasonic_Lumix_DC-S9_25_may_2024a.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Panasonic_Lumix_DC-S9_25_may_2024b.jpg/960px-Panasonic_Lumix_DC-S9_25_may_2024b.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Panasonic_Lumix_DC-S9_25_may_2024b.jpg' },
  ],
  'leica-m6-1986-sold': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Leica_M6.jpg/960px-Leica_M6.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Leica_M6.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Leica_M6_%22Classic%22_black.jpg/960px-Leica_M6_%22Classic%22_black.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Leica_M6_%22Classic%22_black.jpg' },
  ],
  'canon-ae-1-program': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Canon_AE-1_Program_2.jpg/960px-Canon_AE-1_Program_2.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Canon_AE-1_Program_2.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Canon_AE-1_Program_Black2.jpg/960px-Canon_AE-1_Program_Black2.jpg', licence: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Canon_AE-1_Program_Black2.jpg' },
  ],
  'nikon-fm2-chrome': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Nikon_FM2.jpg/960px-Nikon_FM2.jpg', licence: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Nikon_FM2.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/NIKON_FM2.jpg/960px-NIKON_FM2.jpg', licence: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:NIKON_FM2.jpg' },
  ],
  'olympus-mju-ii': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Olympus_%CE%BC_mju_II.jpg/960px-Olympus_%CE%BC_mju_II.jpg', licence: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Olympus_%CE%BC_mju_II.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Olympus_%CE%BC_mju_II_2.jpg/960px-Olympus_%CE%BC_mju_II_2.jpg', licence: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Olympus_%CE%BC_mju_II_2.jpg' },
  ],
  'pentax-k1000': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Pentax_K1000.jpg/960px-Pentax_K1000.jpg', licence: 'CC BY-SA 2.5', source: 'https://commons.wikimedia.org/wiki/File:Pentax_K1000.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Pentax_k1000.jpg/960px-Pentax_k1000.jpg', licence: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Pentax_k1000.jpg' },
  ],
  'contax-t2': [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/CONTAX_T2.jpg', licence: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:CONTAX_T2.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Contax_T2_-1_%283576938591%29.jpg/960px-Contax_T2_-1_%283576938591%29.jpg', licence: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Contax_T2_-1_(3576938591).jpg' },
  ],
  'minolta-x-700': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Minolta_X-700_front_perspective.jpg/960px-Minolta_X-700_front_perspective.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Minolta_X-700_front_perspective.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Minolta_X-700_front.jpg/960px-Minolta_X-700_front.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Minolta_X-700_front.jpg' },
  ],
  'kodak-portra-400-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg/960px-Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg', licence: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_analog_film_reel_Portra_400_(27940330389).jpg' },
  ],
  'kodak-portra-400-120': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Kodak_Portra_400_120_film.jpg/960px-Kodak_Portra_400_120_film.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_Portra_400_120_film.jpg' },
  ],
  'ilford-hp5-plus-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Ilford_HP5_Plus_-_Black_%26_white_film_with_original_box.jpg/960px-Ilford_HP5_Plus_-_Black_%26_white_film_with_original_box.jpg', licence: 'CC BY-SA 3.0 at', source: 'https://commons.wikimedia.org/wiki/File:Ilford_HP5_Plus_-_Black_%26_white_film_with_original_box.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/ILFORD_HP5.jpg/960px-ILFORD_HP5.jpg', licence: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:ILFORD_HP5.jpg' },
  ],
  'kodak-gold-200-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Kodak_Gold_200_Film_Retail_Package.jpg/960px-Kodak_Gold_200_Film_Retail_Package.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_Gold_200_Film_Retail_Package.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Kodak_Gold_200.jpg/960px-Kodak_Gold_200.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_Gold_200.jpg' },
  ],
  'cinestill-800t-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_%2801%29.jpg/960px-Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_%2801%29.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_(01).jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_%2802%29.jpg/960px-Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_%2802%29.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Cinestill_800Tungsten_Xpro_C-41_135_film_cartridge_(02).jpg' },
  ],
  'kodak-ektar-100-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Kodak_Ektar_100_135_film_cartridge_%2801%29.jpg/960px-Kodak_Ektar_100_135_film_cartridge_%2801%29.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_Ektar_100_135_film_cartridge_(01).jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Kodak_Ektar_100_35mm_5312.jpg/960px-Kodak_Ektar_100_35mm_5312.jpg', licence: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Kodak_Ektar_100_35mm_5312.jpg' },
  ],
  'fujifilm-c200-35mm-36': [
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Fujicolor_C200_Film_Roll_And_Box.jpg/960px-Fujicolor_C200_Film_Roll_And_Box.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Fujicolor_C200_Film_Roll_And_Box.jpg' },
    { url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Fujifilm_Fujicolor_C200_box.jpg/960px-Fujifilm_Fujicolor_C200_box.jpg', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Fujifilm_Fujicolor_C200_box.jpg' },
  ],
};

// Sample Photos for the seed: free photos from the Unsplash "film photography" search
// (https://unsplash.com/s/photos/film-photography), under the Unsplash License. Each entry links its photo page,
// which credits the photographer. Dev/demo data only: they stand in for shots taken with each product.
// `sat=-100` (imgix) renders a colour photo in black and white, for black-and-white Film Rolls.
const unsplash = (id: string, page: string, { blackAndWhite = false } = {}): SeedPhoto => ({
  url: `https://images.unsplash.com/photo-${id}?w=1000&q=70&auto=format&fit=crop${blackAndWhite ? '&sat=-100' : ''}`,
  licence: 'Unsplash License',
  source: `https://unsplash.com/photos/${page}`,
});

const BEACH = unsplash('1643138874737-33babf17f0a8', 'a-couple-of-women-sitting-next-to-each-other-on-a-beach-195p-UrLHh4');
const STRIPED_SHIRT = unsplash('1598962134959-27a16982a4db', 'woman-in-red-and-black-stripe-shirt-sitting-on-chair-JGLLU1YNxU4');
const COSMOS = unsplash('1569346276519-709519eeaa51', 'cosmos-flowers-against-blue-sky-jtI_dsxoj1s');
const BLURRY_TREE = unsplash('1640100921962-1086f92e7a59', 'a-blurry-photo-of-a-tree-with-a-sky-in-the-background-pvnqiHyujo8', { blackAndWhite: true });
const BOOKS = unsplash('1561871733-40a3338b8cb4', 'assorted-title-book-lot-in-cabinet-nTifHA326v4', { blackAndWhite: true });
const FLOWER_FIELD = unsplash('1628945301291-a19611e106a7', 'pink-flower-field-near-body-of-water-during-daytime-StQJj4NAYg0');
const WHITE_BOAT = unsplash('1603118258032-aea76c546616', 'white-boat-on-body-of-water-during-daytime-rR8xBouCUn0');
const SUNSET = unsplash('1568190002605-b51fa38eac46', 'a-picture-of-a-sunset-with-clouds-in-the-sky-U2Ug1A6tQew');
const KOI = unsplash('1598461336473-b0cc035d4e35', 'school-of-koi-fish-in-water-rG1RygpXkiY');
const LAKESIDE_TREES = unsplash('1597157153515-028fa3d4bd69', 'green-trees-near-body-of-water-during-daytime-ss8Dka_Tvwg');
const WAVES = unsplash('1596999233004-6ffb15fc364c', 'ocean-waves-crashing-on-shore-during-daytime-53-v5b5qfqc');
// Camera-themed shots from the same search; cameras' Sample Photos stay off the homepage.
const HOLDING_CAMERA = unsplash('1590486803833-1c5dc8ddd4c8', 'person-holding-black-dslr-camera-2b6K4uy0Hbc');
const FILM_CREW = unsplash('1612544409025-e1f6a56c1152', 'film-crew-on-soundstage-workspace-br2HgQuvq6I');
const FILM_REEL = unsplash('1518676590629-3dcbd9c5a5c9', 'photography-of-camera-reel-film-9lTUAlNB87M');
const CAMERA_ON_MAP = unsplash('1452587925148-ce544e77e70d', 'black-and-grey-dslr-camera-near-several-photos-on-brown-map-mj2NwYH3wBA');

// Each photo is used once, so the homepage polaroids never repeat.
export const SAMPLE_PHOTOS: Record<string, SeedPhoto[]> = {
  'fujifilm-x100vi': [HOLDING_CAMERA, FILM_CREW],
  'canon-ae-1-program': [FILM_REEL, CAMERA_ON_MAP],
  'kodak-portra-400-35mm-36': [BEACH, STRIPED_SHIRT, COSMOS],
  'ilford-hp5-plus-35mm-36': [BLURRY_TREE, BOOKS],
  'kodak-gold-200-35mm-36': [FLOWER_FIELD, WHITE_BOAT],
  'cinestill-800t-35mm-36': [SUNSET, KOI],
  'kodak-ektar-100-35mm-36': [LAKESIDE_TREES, WAVES],
};
