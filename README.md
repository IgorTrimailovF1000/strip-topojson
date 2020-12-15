# strip-topojson
Small utility app that strips away geography keys from a topojson object to redice it's size.

---
## installation

`npm install`

## running
`npm index.js`

## custom map
 The topojson source object is included in this app, but if you need a more detailed or even less detailed, you can follow these steps:
- go to http://www.naturalearthdata.com/downloads/110m-cultural-vectors/
- download Admin 0 - Countries
- extract the archive
- go to https://mapshaper.org/
- import .shp and .dbf files into the mapshaper
- at this point you can edit the map and if needed delete Antarctica
- if needed Simplify the map, it will reduce some quality, but also reduce the bundle size
- export map as TopoJSON
- exported map will be in dist/ folder

## config
At the moment we only care about these NAME and ISO_A3 properties, if more are needed, they can be added to the whitelist.

```js 
    const propertyWhitelist = [
        'ISO_A3', 
        'NAME'
    ];
```