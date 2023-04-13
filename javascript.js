// sidebar menu

var menubtn = document.getElementById("menubtn");
var sidenav = document.getElementById("sidenav");
var menu = document.getElementById("menu");

sidenav.style.right = "-250px";

menubtn.onclick = function () {
  if (sidenav.style.right == "-250px") {
    sidenav.style.right = "0";
    menu.src = "images/close.png";
  } else {
    sidenav.style.right = "-250px";
    menu.src = "images/menu.png";
  }
};

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

// sidebar menu einde

//kaart 1 basemap Leaflet

var map1 = L.map("map1", {
  minZoom: 2,
}).setView([24.9920849, 20.0231886], 2);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map1);

L.tileLayer
  .wms("http://localhost:8001/geoserver/sim/wms", {
    layers: "sim:WCMC008_CoralReef2021_Py_v4_1",
    styles: "kleur_coralreefs",
    srs: "EPSG:4326",
    format: "image/png",
    transparent: true,
  })
  .addTo(map1);

// //kaart1 leaflet

//arcgic kaart

require([
  "esri/config",
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/ScaleBar",
  "esri/widgets/Legend",
  "esri/widgets/Legend",
], function (esriConfig, WebMap, MapView, ScaleBar, Legend) {
  esriConfig.apiKey =
    "AAPK0314c65da0f84abb8ef028a130389a79cVjT-pYsoeWYCjFyxgYxjXh1ruuMsA2wydN90s7T65_FsnLSx6GZG9ipAGjuBygh";

  const arcgistest = new WebMap({
    portalItem: {
      id: "c66c1e00f6fe4c29aa22186a26ad3c2e",
    },
  });

  const view = new MapView({
    container: "arcgistest",
    map: arcgistest,
    constraints: {
      minZoom: 2,
    },
  });

  const legend = new Legend({
    view: view,
    container: "legenddiv",
  });

  view.ui.add(legend, "bottom-left");
});

// eind acrgis kaart

//maplibre

var maplibrekaart = new maplibregl.Map({
  container: "maplibrekaart",
  style: "maplibre.json",
  center: [-74.5, 40],
  zoom: 0.5,
});

maplibrekaart.on("load", function () {
  maplibrekaart.addSource("duiklanden", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            land: "Australië",
          },
          geometry: {
            coordinates: [133.6177478604593, -25.000659096614626],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Egypte",
          },
          geometry: {
            coordinates: [29.81822212243665, 26.414126185173842],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Verenigde Staten",
          },
          geometry: {
            coordinates: [-97.7551735820191, 37.76702503899506],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Honduras",
          },
          geometry: {
            coordinates: [-87.10937747385208, 14.733019766286091],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Thailand",
          },
          geometry: {
            coordinates: [100.79472373396885, 13.74465446261145],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Belize",
          },
          geometry: {
            coordinates: [-88.70273543810461, 17.127698549686627],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Galapagos Eilanden",
          },
          geometry: {
            coordinates: [-91.02519168838687, -0.6915866876021113],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Zuid-Afrika",
          },
          geometry: {
            coordinates: [24.74356748003322, -29.521004098933055],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Fiji",
          },
          geometry: {
            coordinates: [178.3202895899683, -17.93888892419696],
            type: "Point",
          },
        },
        {
          type: "Feature",
          properties: {
            land: "Mexico",
          },
          geometry: {
            coordinates: [-101.72610142947259, 21.76454591324668],
            type: "Point",
          },
        },
      ],
    },
  });

  maplibrekaart.addLayer({
    id: "duiklanden",
    type: "circle",
    source: "duiklanden",
    layout: {},
    paint: {
      "circle-color": "#FF0000",
    },
  });
});

maplibrekaart.on("click", function (e) {
  var features = maplibrekaart.queryRenderedFeatures(e.point, {
    layers: ["duiklanden"],
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  new maplibregl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML("<h3>" + feature.properties.land + "</h3>")
    .addTo(maplibrekaart);
});

//einde maplibre

//openlayerkaart begin

var openlayerkaart = new ol.Map({
  target: "openlayerkaart",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([39.161457, 18.9752564]),
    zoom: 2,
  }),
});

var wmsLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?",
    params: {
      LAYERS: "GEBCO_LATEST",
      TILED: true,
    },
    serverType: "mapserver",
  }),
});

openlayerkaart.addLayer(wmsLayer);

//openlayerkaart einde