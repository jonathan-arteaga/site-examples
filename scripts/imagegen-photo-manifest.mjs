#!/usr/bin/env node

/**
 * Text-only generation manifest for the 86 fictional property photos and the
 * one Hearthmere corporate hero. This file intentionally contains no source
 * image paths: every prompt is a fresh generation request.
 *
 * CLI examples:
 *   node scripts/imagegen-photo-manifest.mjs --app=norvale-commons --remaining
 *   node scripts/imagegen-photo-manifest.mjs --owner=content --remaining --json
 *
 * Output schema:
 *   {
 *     id: string,
 *     app: string,
 *     publicPath: string,
 *     width: number,
 *     height: number,
 *     owner: string,
 *     status: "complete" | "remaining",
 *     prompt: string
 *   }
 */

const SYSTEMS = {
  'alderwyck-apartments': {
    owner: 'root',
    place: 'a completely fictional bright garden apartment community in a generic American suburb',
    architecture:
      'two-story bright sand-colored stucco apartment buildings with restrained deep garden-green trim, cream concrete, mature leafy landscaping, and believable attainable-housing details',
    palette: 'bright sand stucco, deep garden green, warm cream, clear blue, and natural foliage',
    light: 'clear late-morning daylight with welcoming, fresh, honest color',
    defaultSize: [1200, 900],
  },
  'norvale-commons': {
    owner: 'asset_implementation',
    place: 'a completely fictional established garden apartment community in a generic American city',
    architecture:
      'two-story warm red-brown brick apartment buildings with charcoal-gray trim, modest gables, mature shade trees, and grounded attainable-housing details',
    palette: 'warm brick, charcoal, cream, olive foliage, and natural wood',
    light: 'warm clear late-afternoon daylight with calm, grounded, honest color',
    defaultSize: [1240, 827],
  },
  'larkmere-gardens': {
    owner: 'demo',
    place: 'a completely fictional calm landscaped garden apartment community in a generic American suburb',
    architecture:
      'two-story pale buff brick apartment buildings with muted sage-green doors and trim, modest covered walkways, soft lawns, flowering shrubs, and believable attainable-housing details',
    palette: 'pale brick, muted sage, soft cream, fresh greens, and light blue',
    light: 'soft bright morning daylight with peaceful, clean, airy color',
    defaultSize: [1200, 900],
  },
  'caldridge-townhomes': {
    owner: 'content',
    place: 'a completely fictional established townhome community in a generic American suburb',
    architecture:
      'connected two-story warm medium-brick townhomes with bold dark-charcoal trim, individual covered entries, mature oaks, layered shrubs, and substantial but attainable details',
    palette: 'warm medium brick, charcoal, ivory mortar, warm oak, and deep landscape green',
    light: 'bright soft-sun daylight with confident, calm, honest color',
    defaultSize: [1200, 900],
  },
  'hearthmere-residential': {
    owner: 'asset_implementation',
    place: 'a completely fictional polished multifamily portfolio in a generic sunlit metropolitan suburb',
    architecture:
      'refined four-story brick-and-light-stone multifamily buildings around a landscaped arrival court, with subtle architectural variety and no identifying landmarks',
    palette: 'warm brick, creamy limestone, charcoal metal, deep green landscape, and soft blue',
    light: 'warm early-evening sunlight with trustworthy, established, polished color',
    defaultSize: [1920, 1080],
  },
};

const A = 'alderwyck-apartments';
const N = 'norvale-commons';
const L = 'larkmere-gardens';
const C = 'caldridge-townhomes';
const H = 'hearthmere-residential';
const SITE_MOUNTS = {
  'alderwyck-apartments': 'alderwyck',
  'norvale-commons': 'norvale',
  'larkmere-gardens': 'larkmere',
  'caldridge-townhomes': 'caldridge',
};

const SCENES = [
  // Alderwyck Apartments: 10 generated photos.
  [A, '/images/exterior/exterior-pool.jpg', 'wide landscaped courtyard with a sparkling rectangular swimming pool, cream deck, and a few neutral lounge chairs', 'wide eye-level establishing view from a pool corner; buildings frame the water', 1200, 900, 'complete'],
  [A, '/images/exterior/exterior-building.jpg', 'garden-facing apartment wing with exterior walkways, layered shrubs, and a curving cream path', 'eye-level front three-quarter architectural view', 1200, 900],
  [A, '/images/exterior/exterior-entrance.jpg', 'welcoming covered apartment entrance with deep-green door, stucco columns, planters, and a clean path', 'medium-wide eye-level entrance view', 1200, 900],
  [A, '/images/exterior/exterior-building2.jpg', 'second apartment wing around a quiet green courtyard with balconies and mature trees', 'wide eye-level diagonal courtyard view', 1200, 900],
  [A, '/images/amenities/pool-1.jpg', 'community pool seen lengthwise with tidy cream deck, simple loungers, and garden apartments beyond', 'wide low eye-level view along the water', 1200, 900],
  [A, '/images/amenities/pool-2.jpg', 'shaded poolside seating corner with simple loungers, striped umbrellas, greenery, and water beyond', 'medium-wide pool-deck view with foreground seating', 1200, 900],
  [A, '/images/amenities/leasing-office.jpg', 'bright modest leasing-office lobby with pale oak reception desk, green accent wall, two guest chairs, plants, and brochure shelving with blank covers', 'wide interior view from the entry', 1200, 900],
  [A, '/images/interior/kitchen.jpg', 'clean attainable apartment kitchen with warm-white shaker cabinets, pale quartz-look counters, stainless appliances, resilient oak-look floor, and small green accents', 'wide corner interior view showing the full working kitchen', 1200, 900],
  [A, '/images/interior/bedroom.jpg', 'comfortable staged apartment bedroom with queen bed, light linen, oak nightstands, deep-green throw, simple window, and practical closet door', 'wide eye-level view from the doorway', 1200, 900],
  [A, '/images/interior/bathroom.jpg', 'compact updated apartment bathroom with warm-white vanity, brushed-nickel fixtures, tub-shower, pale tile, and deep-green towels', 'wide doorway view with straight verticals', 1200, 900],

  // Norvale Commons: 22 generated photos.
  [N, '/images/exterior/hero.jpg', 'handsome brick apartment buildings along a simple curved drive under a canopy of mature shade trees', 'wide eye-level establishing view from across the drive', 1024, 695, 'complete'],
  [N, '/images/exterior/aerial.jpg', 'several brick garden-apartment buildings organized around tree-filled lawns, drives, and a small central amenity area', 'elevated oblique aerial-style architectural view, not satellite imagery', 1024, 680],
  [N, '/images/exterior/entry-sign.jpg', 'low brick monument sign with an intentionally blank charcoal inset panel, surrounded by layered shrubs at the community drive', 'medium-wide eye-level arrival view; blank panel contains no lettering or symbols', 1240, 826],
  [N, '/images/exterior/building-landscaping.jpg', 'brick apartment facade behind hydrangeas, ornamental grasses, low hedges, and mature tree trunks', 'wide eye-level three-quarter landscaping-forward view', 1240, 826],
  [N, '/images/exterior/building-stairs.jpg', 'well-kept exterior charcoal stair and covered landing against warm brick with tidy planting below', 'medium-wide diagonal architectural detail view', 1240, 826],
  [N, '/images/exterior/building-grill-area.jpg', 'small communal grill patio with two black grills, picnic table, stringless shade structure, brick buildings, and trees', 'wide eye-level amenity view', 1240, 826],
  [N, '/images/exterior/community-building.jpg', 'one-story brick community building with charcoal gable, covered porch, accessible walkway, and mature trees', 'wide front three-quarter architectural view', 1024, 680],
  [N, '/images/interior/kitchen.jpg', 'updated apartment kitchen with warm oak cabinets, charcoal counters, stainless appliances, practical vinyl plank flooring, and soft neutral walls', 'wide corner view showing counters and appliances', 1240, 827],
  [N, '/images/interior/dining-area.jpg', 'compact dining nook beside the kitchen with round wood table, four chairs, simple pendant, and warm brick-toned accents', 'wide eye-level view connecting dining and kitchen', 1240, 827],
  [N, '/images/interior/living-room-fireplace.jpg', 'welcoming living room with a simple painted fireplace, charcoal surround, warm neutral sofa, oak tables, and natural woven rug', 'wide view from the entry with fireplace as focal point', 1240, 827],
  [N, '/images/interior/master-bedroom.jpg', 'staged primary bedroom with queen bed, warm linen, charcoal headboard, oak dresser, leafy window view, and practical proportions', 'wide view from one corner', 1240, 827],
  [N, '/images/interior/master-bedroom-2.jpg', 'alternate primary bedroom with soft clay bedding, upholstered headboard, modest reading chair, warm lamp, and closet door', 'wide doorway-to-window view distinct from the other bedroom', 1240, 827],
  [N, '/images/interior/kids-bedroom.jpg', 'cheerful but restrained children bedroom with twin bed, muted rust and charcoal textiles, small bookcase, and age-neutral decor with no words', 'wide view from doorway', 1240, 827],
  [N, '/images/interior/bedroom-closet.jpg', 'open apartment walk-in closet with white wire shelving, neatly arranged neutral clothing, shoe shelves, and bedroom edge visible', 'medium-wide straight-on closet view', 1240, 827],
  [N, '/images/interior/bathroom.jpg', 'updated compact bathroom with oak vanity, pale counter, brushed-nickel fixtures, tub-shower, warm neutral tile, and charcoal towels', 'wide doorway view with straight verticals', 1240, 827],
  [N, '/images/amenities/pool.jpg', 'community swimming pool with simple pale deck, charcoal loungers, brick apartments, trees, and a modest pergola', 'wide eye-level view across one pool corner', 1024, 695],
  [N, '/images/amenities/pet-park.jpg', 'fenced pet exercise lawn with simple agility hoops and shaded bench, mature trees, and brick buildings beyond', 'wide eye-level amenity view; no animals or people', 1024, 705],
  [N, '/images/amenities/clubhouse-interior.jpg', 'comfortable clubhouse room with brick fireplace, charcoal mantel, warm neutral sectional, oak tables, and leafy window views', 'wide interior view with fireplace and seating', 1024, 678],
  [N, '/images/amenities/clubhouse-lounge.jpg', 'clubhouse lounge with several seating groups, warm brick accents, charcoal upholstery, natural wood, and soft lamps', 'wide corner view showing practical circulation', 1240, 827],
  [N, '/images/amenities/clubhouse-lounge-2.jpg', 'second clubhouse lounge angle with communal table, reading chairs, plants, and large windows', 'wide view distinct from the fireplace lounge', 1240, 827],
  [N, '/images/amenities/laundry-room.jpg', 'clean shared laundry room with two rows of white front-loading machines, folding counter, charcoal tile, and bright practical lighting', 'wide aisle view with straight verticals', 1240, 827],
  [N, '/images/amenities/playground.jpg', 'small community playground with charcoal and muted-rust equipment, safety surface, bench, trees, and brick apartments beyond', 'wide eye-level playground view; no children or people', 1240, 826],

  // Larkmere Gardens: 24 generated photos.
  [L, '/images/exterior/building-front.jpg', 'pale-brick apartment building front with sage doors, soft lawn, flowering shrubs, and a gracious curved approach path', 'wide eye-level front three-quarter view', 1200, 900, 'complete'],
  [L, '/images/exterior/exterior-building.jpg', 'garden-facing apartment wing with sage covered walkway, pale brick, hydrangeas, and mature shade trees', 'wide diagonal architectural view', 1200, 900],
  [L, '/images/exterior/buildings-parking.jpg', 'two coordinated pale-brick apartment buildings beyond a small tidy parking court with landscaped islands', 'wide eye-level view across parking; only a few generic unbranded cars', 1200, 900],
  [L, '/images/exterior/entrance-walkway.jpg', 'covered sage-green walkway leading to several apartment entries, pale brick columns, planters, and soft garden light', 'medium-wide one-point perspective down the walkway', 1200, 900],
  [L, '/images/exterior/entry-sign.jpg', 'pale-brick monument sign with an intentionally blank sage inset panel and flowering landscape at the entry', 'medium-wide eye-level arrival view; blank panel has no lettering', 1200, 900],
  [L, '/images/exterior/garages-carport.jpg', 'row of simple pale-brick detached garages beside a sage-painted carport and landscaped drive', 'wide three-quarter utility architecture view', 1200, 900],
  [L, '/images/exterior/carport-wide.jpg', 'long sage-painted carport with clean parking bays, pale-brick apartments, soft lawn, and trees beyond', 'wide horizontal view from across the drive; minimal generic vehicles', 1200, 900],
  [L, '/images/exterior/building-picnic-area.jpg', 'garden apartment building beside a modest picnic lawn with two tables, a small pergola, flowering shrubs, and shade trees', 'wide eye-level amenity-and-building view', 1200, 900],
  [L, '/images/interior/living-room.jpg', 'staged apartment living room with cream sofa, sage accent chair, pale oak tables, woven rug, and leafy window view', 'wide view from entry corner', 1200, 900],
  [L, '/images/interior/kitchen.jpg', 'bright apartment kitchen with warm-white cabinets, sage lower accent cabinetry, pale counters, stainless appliances, and compact dining bar', 'wide corner view showing complete work area', 1200, 900],
  [L, '/images/interior/kitchen-2.jpg', 'second kitchen layout with pale oak cabinets, white backsplash, stainless appliances, peninsula, and open living area beyond', 'wide diagonal view distinct from the first kitchen', 1200, 900],
  [L, '/images/interior/bedroom.jpg', 'serene primary bedroom with queen bed, cream linen, muted-sage headboard, pale oak nightstands, and simple window', 'wide eye-level view from doorway', 1200, 900],
  [L, '/images/interior/bedroom-2.jpg', 'second bedroom with full bed, soft blue-sage textiles, compact desk, practical closet, and bright window', 'wide corner view distinct from primary bedroom', 1200, 900],
  [L, '/images/interior/kids-room.jpg', 'tidy children room with twin-over-twin pale wood bunk bed, muted sage and ochre bedding, small toy bins, and no readable text', 'wide doorway view with safe realistic proportions', 1200, 900],
  [L, '/images/interior/bathroom.jpg', 'compact bathroom with pale oak vanity, light stone-look counter, brushed nickel, tub-shower, white tile, and sage towels', 'wide doorway view with straight verticals', 1200, 900],
  [L, '/images/interior/living-room-2.jpg', 'alternate living room with loveseat, reading chair, slim media console, pale rug, and soft sage accents', 'wide view toward the windows, distinct layout', 1200, 900],
  [L, '/images/interior/living-kitchen-open.jpg', 'open-plan living and kitchen space with pale cabinets, compact island, cream sofa, oak table, and generous natural light', 'wide diagonal composition connecting both zones', 1200, 900],
  [L, '/images/interior/washer-dryer-hookup.jpg', 'clean in-unit laundry alcove with empty washer and dryer hookups, shelf, utility connections, pale walls, and resilient floor', 'straight-on medium-wide documentary interior view', 1200, 900],
  [L, '/images/amenities/playground.jpg', 'community playground with sage and muted-yellow equipment, benches, safety surface, shade trees, and pale-brick buildings', 'wide eye-level amenity view; no people', 1200, 900],
  [L, '/images/amenities/playground-2.jpg', 'second smaller playground with climbing structure, two swings, soft lawn edge, and flowering shrubs', 'wide diagonal view distinct from main playground; no people', 1200, 900],
  [L, '/images/amenities/playground-wide.jpg', 'broad landscaped view of playground and picnic lawn framed by pale-brick apartment buildings', 'very wide eye-level establishing view; no people', 1200, 900],
  [L, '/images/amenities/laundry-room.jpg', 'bright shared laundry room with white commercial machines, long folding counter, sage wall accents, benches, and practical lighting', 'wide aisle view', 1200, 900],
  [L, '/images/amenities/laundry-machines.jpg', 'orderly close architectural view of a row of white commercial washers and dryers with clean controls and folding surface', 'medium-wide three-quarter equipment view; no readable labels', 1200, 900],
  [L, '/images/amenities/leasing-office.jpg', 'calm leasing office with pale oak reception desk, sage panel wall, cream chairs, plants, and blank brochure covers', 'wide view from the entrance', 1200, 900],

  // Caldridge Townhomes: 30 generated photos.
  [C, '/images/exterior/primary-1.jpg', 'long handsome row of connected townhomes with individual covered entries, small patios, crisp lawns, and mature oaks', 'wide eye-level three-quarter view down the row', 1200, 900, 'complete'],
  [C, '/images/exterior/primary-2.jpg', 'community arrival with two dark-trim brick townhome rows, landscaped median, and an intentionally blank low monument panel', 'wide eye-level arrival view; no lettering on monument', 1200, 900],
  [C, '/images/exterior/exterior-building.jpg', 'brick townhomes around a quiet green courtyard with dark trim, paths, layered shrubs, and mature trees', 'wide eye-level courtyard view', 1200, 900],
  [C, '/images/exterior/exterior-entrance.jpg', 'sequence of individual dark-trim covered townhome entrances with warm brick, porch lights, and neat foundation planting', 'medium-wide diagonal entry view', 1200, 900],
  [C, '/images/exterior/building-1.jpg', 'townhome end building with dark gable, brick side wall, private patio fence, lawn, and large oak', 'wide front three-quarter architectural view', 1200, 900],
  [C, '/images/exterior/building-2.jpg', 'another connected townhome row seen across a landscaped walking path with repeated but natural individual entries', 'wide eye-level view from lawn edge', 1200, 900],
  [C, '/images/exterior/building-3.jpg', 'two townhome buildings framing a shared green with benches, shrubs, and shade trees', 'wide symmetrical courtyard establishing view', 1200, 900],
  [C, '/images/exterior/exterior-grass.jpg', 'broad manicured lawn and layered landscaping in front of warm-brick townhomes with bold dark trim', 'low eye-level landscape-forward view', 1200, 900],
  [C, '/images/amenities/pool-1.jpg', 'rectangular community pool with charcoal loungers, pale deck, mature oaks, and dark-trim brick townhomes beyond', 'wide eye-level view across one pool corner', 1200, 900],
  [C, '/images/amenities/leasing-center.jpg', 'welcoming one-story brick leasing center with dark gable, covered entry, accessible path, planters, and blank door glass', 'wide front three-quarter exterior view', 1200, 900],
  [C, '/images/interior/interior-1.jpg', 'unfurnished townhome living room with dark-trim fireplace, oak-look floor, cream walls, and tall window', 'wide interior view from entry with straight verticals', 1200, 900],
  [C, '/images/interior/interior-2.jpg', 'staged townhome living area with warm neutral sectional, brick fireplace, charcoal mantel, oak tables, and leafy patio view', 'wide corner view', 1200, 900],
  [C, '/images/interior/interior-3.jpg', 'open kitchen and dining space with warm oak cabinets, charcoal counters, simple pendant, wood table, and resilient floor', 'wide diagonal view connecting both zones', 1200, 900],
  [C, '/images/interior/interior-4.jpg', 'compact galley kitchen with cream upper cabinets, warm oak lowers, dark counter, stainless appliances, and practical lighting', 'wide one-point perspective down the galley', 1200, 900],
  [C, '/images/interior/interior-5.jpg', 'updated townhome kitchen detail with dark counters, warm cabinet grain, stainless range, simple backsplash, and island edge', 'medium-wide three-quarter kitchen view', 1200, 900],
  [C, '/images/interior/interior-6.jpg', 'living room and staircase junction with charcoal stair rail, brick fireplace, oak-look floor, and bright window', 'wide interior architectural view', 1200, 900],
  [C, '/images/interior/interior-7.jpg', 'primary bedroom with queen bed, charcoal upholstered headboard, warm linen, oak nightstands, and two windows', 'wide view from doorway', 1200, 900],
  [C, '/images/interior/interior-8.jpg', 'two-story townhome living space with cream sofa, dark-trim fireplace, patio door, oak table, and stairs visible', 'wide diagonal view showing townhouse depth', 1200, 900],
  [C, '/images/interior/interior-9.jpg', 'updated full bathroom with warm oak vanity, charcoal counter, white tub-shower, cream tile, and dark metal accents', 'wide doorway view with straight verticals', 1200, 900],
  [C, '/images/interior/interior-10.jpg', 'dining area with rectangular oak table, six charcoal chairs, simple pendant, brick-toned art with no text, and kitchen beyond', 'wide eye-level dining view', 1200, 900],
  [C, '/images/interior/interior-11.jpg', 'comfortable second living room with neutral sofa, charcoal media console, warm rug, and large patio window', 'wide corner view distinct from fireplace room', 1200, 900],
  [C, '/images/interior/interior-12.jpg', 'entry hall highlighting oak-look flooring, dark stair rail, cream walls, coat closet, and warm practical finishes', 'wide straight architectural view', 1200, 900],
  [C, '/images/interior/interior-13.jpg', 'walk-in closet with white shelving, organized neutral clothes, shoe storage, and clean warm lighting', 'medium-wide straight-on closet view', 1200, 900],
  [C, '/images/interior/interior-14.jpg', 'in-unit laundry alcove with side-by-side white washer and dryer, overhead shelf, cream walls, and oak-look floor', 'straight-on medium-wide documentary view; no readable labels', 1200, 900],
  [C, '/images/interior/interior-15.jpg', 'sunlit upstairs landing arranged as a compact home-office nook with oak desk, charcoal chair, stair rail, and blank wall art', 'wide landing view; no screens or readable text', 1200, 900],
  [C, '/images/interior/interior-16.jpg', 'clean under-stair storage and utility area with shelving, neutral bins, dark-trim door, and practical light', 'medium-wide interior documentation view', 1200, 900],
  [C, '/images/interior/interior-17.jpg', 'bright townhome family room with cream sectional, warm oak furniture, charcoal accents, patio door, and mature greenery outside', 'wide view toward patio distinct from other living rooms', 1200, 900],
  [C, '/images/interior/unit-1br-1ba.jpg', 'cozy one-bedroom unit open living and dining area with compact brick fireplace, warm neutral sofa, small oak table, and efficient proportions', 'wide diagonal view showing full main room', 1200, 900],
  [C, '/images/interior/unit-1br-1ba-2.jpg', 'one-bedroom unit kitchen and entry with warm cabinets, dark counter, stainless appliances, coat closet, and living room edge', 'wide reverse angle distinct from the main-room photo', 1200, 900],
  [C, '/images/interior/unit-2br-1.5ba.jpg', 'two-bedroom townhome main floor with open living and dining zones, charcoal stair rail, warm brick fireplace, and patio door', 'wide diagonal view emphasizing two-story layout', 1200, 900],

  // Hearthmere Residential: one generated corporate hero.
  [H, '/images/hero.jpg', 'broad landscaped approach to several refined four-story apartment buildings arranged around a green arrival court, with generous sky and tree-canopy negative space at upper left', 'cinematic wide establishing view; crop-safe 16:9 with copy space at left', 1920, 1080, 'complete'],
];

function buildPrompt(app, subject, framing, width, height) {
  const system = SYSTEMS[app];
  return `Use case: photorealistic-natural
Asset type: ${app === H ? 'corporate multifamily property-management website hero photograph' : 'apartment community website gallery photograph'}
Primary request: ${subject}
Scene/backdrop: ${system.place}; no identifying landmarks
Subject: ${system.architecture}; ${subject}
Style/medium: polished but believable professional real-estate photography with realistic materials, natural imperfections, and straight architectural geometry
Composition/framing: ${framing}; final crop ${width}x${height}
Lighting/mood: ${system.light}
Color palette: ${system.palette}
Constraints: exactly one continuous full-frame photograph of one scene; no collage, montage, diptych, split screen, inset, border, or before-and-after layout; entirely original fictional property; create a fresh image from this text only; no reference images; no client pixels; no people; no readable signs; no property names; no logos; no trademarks; no text; no watermark; no famous architecture; no distorted geometry; no fisheye; crop-safe for ${width}:${height}
Avoid: multiple panels or combined scenes, recognizable real property, stock-photo cliché, impossible windows or stairs, repeated uncanny objects, oversaturated HDR, artificial luxury-resort excess`;
}

export const PHOTO_MANIFEST = SCENES.map(
  ([app, publicPath, subject, framing, width, height, status = 'complete']) => ({
    id: `${app}:${publicPath}`,
    app,
    publicPath,
    width,
    height,
    owner: SYSTEMS[app].owner,
    status,
    generatedSource: null,
    prompt: buildPrompt(app, subject, framing, width, height),
  })
);

function readArg(name) {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const app = readArg('app');
  const owner = readArg('owner');
  const remainingOnly = process.argv.includes('--remaining');
  const asJson = process.argv.includes('--json');

  const selected = PHOTO_MANIFEST.filter((item) => {
    if (app && item.app !== app) return false;
    if (owner && item.owner !== owner) return false;
    if (remainingOnly && item.status !== 'remaining') return false;
    return true;
  });

  if (asJson) {
    process.stdout.write(`${JSON.stringify(selected, null, 2)}\n`);
  } else {
    for (const item of selected) {
      const publicRoot = SITE_MOUNTS[item.app]
        ? `apps/hearthmere-residential/public/${SITE_MOUNTS[item.app]}`
        : `apps/${item.app}/public`;
      console.log(`\n${item.id}`);
      console.log(`target: ${publicRoot}${item.publicPath} (${item.width}x${item.height})`);
      console.log(`owner: ${item.owner}; status: ${item.status}`);
      console.log(item.prompt);
    }
    console.log(`\ncount: ${selected.length}`);
  }
}
