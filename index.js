const fs = require('fs');

const propertyWhitelist = ['ISO_A3', 'NAME'];

fs.readFile('./src/countries_110m.json', function (err, data) {
	try {
		// parse the json and remove some of the properties that we won't use
		const json = JSON.parse(data);
		const iso3s = []
		const result = Object.keys(json).reduce((acc, key) => {
			if (key !== 'objects') {
				return {
					...acc,
					[key]: json[key],
				};
			}

			/*
            {
                random_key: {
                    type: 'GeometryCollection',
                    geometries: []
                }
            }
            */
			const objects = {
				countries: {
					type: 'GeometryCollection',
					geometries: Object.values(json[key])[0].geometries.map(
						(geometry) => {
							console.log()
							iso3s.push(geometry.properties.ISO_A3)
							return {
								...geometry,
								properties: Object.keys(
									geometry.properties
								).reduce((props, key) => {
									return propertyWhitelist.includes(key)
										? {
												...props,
												[key]: geometry.properties[key],
										}
										: props;
								}, {}),
							};
						}
					),
				},
			};

			return {
				...acc,
				objects,
			};
		}, {});

		// write the result to a new json file in dist folder
		try {
			fs.writeFile(
				'./dist/world-110m.json',
				JSON.stringify(result),
				(error) => {
					if (error) {
						console.log('Could not write to file', error);
					}
				}
			);
		} catch (err) {
			console.log('Could not assemble result', err);
		}
		console.log(iso3s);
	} catch (err) {
		console.log('Could not read source file', err);
	}
});
