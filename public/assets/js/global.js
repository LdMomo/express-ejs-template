var map1, map1_center, map1_extend, map1_zoom;

var stats=[];

var map2;
var minimap;
var liveUnitIds = [];
//Config Options -start
var limitSidebar = true;
var limitMapView = true;

var traiLine = 'true';

if (typeof getCookie('map_marker_traiLine') !== 'undefined' && getCookie('map_marker_traiLine') != '') {
    traiLine = getCookie('map_marker_traiLine')
} else {
    document.cookie = "map_marker_traiLine=true";
}

var unitViewRange = 'true';

if (typeof getCookie('map_marker_unitViewRange') !== 'undefined' && getCookie('map_marker_unitViewRange') != '') {
    unitViewRange = getCookie('map_marker_unitViewRange')
} else {
    document.cookie = "map_marker_unitViewRange=true";
}

var markerPoint = 'true';

if (typeof getCookie('map_marker_markerPoint') !== 'undefined' && getCookie('map_marker_markerPoint') != '') {
    markerPoint = getCookie('map_marker_markerPoint')
} else {
    document.cookie = "map_marker_markerPoint=true";
}
var markerTypes = 'pin';
if (typeof getCookie('map_marker_types') !== 'undefined' && getCookie('map_marker_types') != '') {
    markerTypes = getCookie('map_marker_types')
} else {
    document.cookie = "map_marker_types=pin";
}
//Config Options -end
var maplayers = [];
var maplayerObjUQ = [];
maplayerObjUQ['Police Cameras'] = [];
maplayerObjUQ['National Weather'] = [];
maplayerObjUQ['Local Sea Vessels'] = [];
maplayerObjUQ['Address'] = [];
maplayerObjUQ['Address Alias'] = [];
maplayerObjUQ['Search Result'] = [];
var atoll_list = [];
var mapFeatures = [];
var departmentMapState = [];
var departmentSubcat = [];
var subcatList = [];
subcatList['islands_in_view'] = []
var subcategoryids = [];
var departmentList = [];
var syncpath = "http://172.20.33.20/gmapapi/templateRes/js/gmapv2/old_js/";
syncpath = '//top.police.gov.mv/map/';
// Data Array
var mUnits = [];
var radioUnits = [];
// Markers
var radio_units = [];




var toasts = [];
var mapLayerGroups = [{
        name: 'geoBounded',
        title: 'Geographically Bounded'
    },
    {
        name: 'mob',
        title: 'Countries outer most boundries'
    },
    {
        name: 'iob',
        title: 'Island outer most boundries'
    },
    {
        name: 'izb',
        title: 'Island zone boundries'
    },
    {
        name: 'zbb',
        title: 'Island block boundries'
    },
    {
        name: 'bob',
        title: 'Building boundries'
    },
]
var mapLayers = [{
        geoBounded: [{
                name: 'Address',
                visible: true,
                zoom: 18,
                icons: null,
                layerType: 'Vector',
                description: 'Residential',
                uqObjects: []
            }, {
                name: 'Address Alias',
                visible: true,
                zoom: 18,
                icons: null,
                layerType: 'Vector',
                description: 'Addresses / Locations names',
                uqObjects: []
            },
            {
                name: 'Police Cameras',
                visible: true,
                zoom: 18,
                icons: null,
                layerType: 'Vector',
                description: 'Enable from zoom level 18 and onwards. Your current zoom level is <span class=\'map1_zoom\'></span> and onwards',
                uqObjects: []
            },
            {
                name: 'National Weather',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: 'Vector',
                description: 'Weather is update every 3 hours',
                uqObjects: []
            },
            {
                name: 'Local Sea Vessels',
                visible: true,
                zoom: 0,
                icons: [
                    ['Buggy', 'assets/css/images/ship_blue.png'],
                    ['Car', 'assets/css/images/ship_blue.png'],
                    ['Dhoni', 'assets/css/images/ship_blue.png'],
                    ['Dinghy', 'assets/css/images/ship_blue.png'],
                    ['Excursion Dhoni', 'assets/css/images/ship_blue.png'],
                    ['Fishing Dhoni', 'assets/css/images/ship_blue.png'],
                    ['Landing Craft', 'assets/css/images/ship_blue.png'],
                    ['Motorcycle', 'assets/css/images/ship_blue.png'],
                    ['Person', 'assets/css/images/ship_blue.png'],
                    ['Safari', 'assets/css/images/ship_blue.png'],
                    ['Speed Boat', 'assets/css/images/ship_blue.png'],
                    ['Supply Boat', 'assets/css/images/ship_blue.png'],
                    ['Supply Dhoni', 'assets/css/images/ship_blue.png'],
                    ['Trucks & Lorries', 'assets/css/images/ship_blue.png'],
                    ['Tug Boat', 'assets/css/images/ship_blue.png'],
                    ['Yacht', 'assets/css/images/ship_blue.png'],
                ],
                layerType: 'Vector',
                description: 'Try to zoom to a single island or area',
                uqObjects: []
            }
        ]
    },
    {
        mob: [{
                name: 'Plates',
                dbname: 'plates',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World_aisa',
                dbname: 'World_aisa',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World oceanica',
                dbname: 'World_oceanica',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World africa',
                dbname: 'World_africa',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World South america',
                dbname: 'World_South_america',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World europe',
                dbname: 'World_europe',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World submarine cable',
                dbname: 'submarine cable',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'World north america',
                dbname: 'World_north america',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            },
            {
                name: 'divisions',
                dbname: 'divisions',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }, {
                name: 'Atoll',
                dbname: 'Atoll',
                visible: true,
                zoom: 0,
                icons: null,
                layerType: '3D Flat',
                description: '',
                uqObjects: []
            }
        ]
    },


    {
        iob: [{
            name: 'island boundries',
            dbname: 'island_boundries',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, {
            name: 'Island names',
            dbname: 'island_name',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: 'Vector',
            description: '',
            uqObjects: []
        }, {
            name: 'layout male',
            dbname: 'layout_male',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, ]
    }, {
        izb: [{
            name: 'zone hulhumale',
            dbname: 'zone_hulhumale',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, {
            name: 'zones GP',
            dbname: 'zones_GP',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, {
            name: 'Male Zones',
            dbname: 'zone_male',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: 'Districts of Male city',
            uqObjects: []
        }, {
            name: 'zones_MP',
            dbname: 'zones_MP',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, {
            name: 'subzones_MP',
            dbname: 'subzones_MP',
            visible: true,
            zoom: 0,
            icons: null,
            layerType: '3D Flat',
            description: '',
            uqObjects: []
        }, ]
    }, {
        zbb: [{
            name: 'Gdh. Thinadhoo Blocks',
            dbname: 'block_gdh_thinadhoo',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D Flat',
            uqObjects: []
        }, {
            name: 'K. Male Blocks',
            dbname: 'block_male',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D Flat',
            uqObjects: []
        }, {
            name: 'K. Hulhumale Blocks',
            dbname: 'Hulhumale Blocks',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D Flat',
            uqObjects: []
        }]
    },
    {
        bob: [{
            name: 'K. Hulhumale',
            dbname: 'hulhumale',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        }, {
            name: 'K. Male',
            dbname: 'AllMale',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        }, {
            name: 'K. Villigili',
            dbname: 'k.villingili',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        }, {
            name: 'Gn. Fuvahmulah',
            dbname: 'Fuvahmulah',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        },{
            name: 'S. Hithadhoo',
            dbname: 'Hithadhoo',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        }, {
            name: 'Test',
            dbname: 'test1',
            visible: true,
            zoom: 0,
            icons: null,
            description: '',
            layerType: '3D',
            uqObjects: []
        }]
    },
];

/*
- server_Police : Get data from mps api
- server_GeoApi : get data from radio server api
- bindLayersFunc : Add map layers to map
- iniMap : initilize maps 
*/

var server_Police = {
    getEmpImage: function (serviceno, unitno) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer UpaSRzw0Iw");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "PHPSESSID=qieojbd0m4hn2hhinakunh6jk4");

        var raw = JSON.stringify({
            "param": {
                "serviceno": serviceno
            }
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://pii.police.gov.mv/api/tetra-employee", requestOptions)
            .then(response => response.text())
            .then(result => server_Police.showEmpImage(JSON.parse(result), unitno))
            .catch(error => console.log('error', error));

    },
    showEmpImage: function (data, unitno) {
        mUnits['marker_' + unitno].options.issueduser = data;
        $(".img_" + data.data.copid).attr("src", data.data.image);

        return data.data;
    }
}
var server_GeoApi = {
    //--------------------------- POST START>
    updateAddress: function (addressid, lat, lng,dhiname,floor,username,pattern) {


        var p = new Promise(function (resolve, reject) {


            // WARNING: For POST requests, body is set to null by browsers.
            var data = JSON.stringify({
                "addressid": "" + addressid + "",
                "floor": floor,
                "name_dhi": dhiname,
                "lat": lng,
                "lng": lat,
                "updatedby": username,
                "address_standard": pattern
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "//top.police.gov.mv/api/updateaddloc");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader('Authorization', 'Bearer [your access token]');
           // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
           // xhr.setRequestHeader("Access-Control-Allow-Methods", "POST");
             
            xhr.send(data);

        });

        return p;


    },
    //--------------------------- POST START>
    //--------------------------- LAYERS START>

    get3dLayers: function (layerType, layerName) {

        var e = map1.getExtent();
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/' + layerType + '?type=' + layerName + '&xmax=' + e.xmax + '&ymax=' + e.ymax + '&xmin=' +
            e.xmin + '&ymin=' + e.ymin + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;


    },

    getAddressLayer: function () {

        var e = map1.getExtent();
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/add?y1=' + e.xmax + '&x1=' + e.ymax + '&y2=' +
                e.xmax + '&x2=' + e.ymin + '&y3=' + e.xmin + '&x3=' + e.ymin + '&y4=' + e.xmin + '&x4=' + e.ymax + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;



    },
    getAddressAliasLayer: function () {

        var e = map1.getExtent();
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/ban?y1=' + e.xmax + '&x1=' + e.ymax + '&y2=' +
                e.xmax + '&x2=' + e.ymin + '&y3=' + e.xmin + '&x3=' + e.ymin + '&y4=' + e.xmin + '&x4=' + e.ymax + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;


    },
    getLocalSeaVesselLayer: function () {

        var e = map1.getExtent();
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/followme?x1=' + e.xmax + '&y1=' + e.ymax + '&x2=' +
                e.xmin + '&y2=' + e.ymin + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;


    },


    getIslandBlockLayer: function () {
        var e = map1.getExtent();
        var zoom = map1.getZoom()
        console.log(e)
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/zbb?y1=' + e.xmax + '&x1=' + e.ymax + '&y2=' +
                e.xmax + '&x2=' + e.ymin + '&y3=' + e.xmin + '&x3=' + e.ymin + '&y4=' + e.xmin + '&x4=' + e.ymax + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },
    getBuildingLayer: function () {
        var e = map1.getExtent();
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/bob?y1=' + e.xmax + '&x1=' + e.ymax + '&y2=' +
                e.xmax + '&x2=' + e.ymin + '&y3=' + e.xmin + '&x3=' + e.ymin + '&y4=' + e.xmin + '&x4=' + e.ymax + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },
    getWeatherLayer: function () {


        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/weather');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;


    },

    getCameraLayer: function () {
        var e = map1.getExtent();

        var zoom = map1.getZoom()

        if (zoom >= 18) {

            var p = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '//top.police.gov.mv/api/camera?x1=' + e.xmax + '&y1=' + e.ymax + '&x2=' +
                    e.xmin + '&y2=' + e.ymin + '');
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(Error(xhr.statusText));
                    }
                };
                xhr.onerror = function () {
                    reject(Error('error fetching JSON data'));
                };
                xhr.send();
            });

            return p;

        }
    },
    //--------------------------- LAYERS END> 
    getMapObject: function (objectid) {

        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/objinfo?obj=' + objectid);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;


    },
    getIslandsInView: function () {
        var e = map1.getExtent();


        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/geo_bouned_island?xmax=' + e.xmax + '&ymax=' + e.ymax + '&xmin=' +
                e.xmin + '&ymin=' + e.ymin + '');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;


    },
    getAddressByIsland: function (islandid, parm) {

        if (parm.length >= 2) {
            var p = new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '//top.police.gov.mv/api/search_address?name=' + parm + '&isl_id=' + islandid);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        resolve(xhr.response);
                    } else {
                        reject(Error(xhr.statusText));
                    }
                };
                xhr.onerror = function () {
                    reject(Error('error fetching JSON data'));
                };
                xhr.send();
            });
            p.then(function (data) {
                var features = JSON.parse(data);
                bindLayersFunc.drawMap1Layer(features, 'Search Result')
            });
           
            return p;
           
        }


    },

    getGeoLayerTypes: function (tp) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv:3300/type?type=' + tp);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },
    getFlyView: function (id) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/fly/');
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },
    getUnitbyid: function (id) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/radio/' + id);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },

    getUnitbySubcat: function (id) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/radio?subc=' + id);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;
    },
    getUnitbyDeptid: function (id) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/radio?dpt_id=' + id);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });

        return p;
    },
    getDepartment: function (id) {
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '//top.police.gov.mv/api/dept?unitno=' + unitdata.unitno);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    },
    getDepartmentList: function () {
        var p = new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();

            xhr.open('GET', '//top.police.gov.mv/api/deptlist1');
            // xhr.withCredentials = true;
            //xhr.setRequestHeader('Access-Control-Allow-Methods ', "GET");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };
            xhr.onerror = function () {
                reject(Error('error fetching JSON data'));
            };
            xhr.send();
        });
        return p;
    }

}
var bindLayersFunc = {
    draw3dMap1Layer: function (layertType, properties) {
        var p = server_GeoApi.get3dLayers(layertType, properties.dbname);
        p.then(function (data) {
            var features = JSON.parse(data);
            console.log(features)
            if (properties.layerType == '3D') {
                render3D.generateBuildings([features])
            } else {
                render3D.generateBlock([features], layertType)
            }


        }, function (error) {
            console.log(error);
        });
    },
    drawMap1Layer: function (jdata, name) {

        switch (name) {
            case 'Geojson':
                if (jdata == 'server') {
                    var p = server_GeoApi.getIslandBlockLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);

                        render3D.generateBlock([features])

                    }, function (error) {
                        console.log(error);
                    });
                }
                break;
            case 'Land Blocks':
                if (jdata == 'server') {
                    var p = server_GeoApi.getIslandBlockLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);

                        render3D.generateBlock([features])

                    }, function (error) {
                        console.log(error);
                    });
                } 
                break;
            case 'Buildings':
                if (jdata == 'server') {
                    var p = server_GeoApi.getBuildingLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);
                        console.log(features)
                        render3D.generateBuildings([features])

                    }, function (error) {
                        console.log(error);
                    });
                }
                break;
            case 'Search Result':
                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'Search Result',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: { 
                            lineWidth: 5,
                            lineColor: '#FFF700'
                        }
                    }).addTo(map1);
                    //  maplayers[name].hide();
                }
                 bindLayersFunc.drawFeaturSearchResult(jdata, name);
                break;
            case 'National Weather':
                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'National Weather',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: {
                            lineWidth: 0,
                            lineColor: '#0900FF'
                        }
                    }).addTo(map1);
                    //  maplayers[name].hide();
                }
                if (jdata == 'server') {
                    var p = server_GeoApi.getWeatherLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);
                        console.log(features)
                        bindLayersFunc.drawFeaturNationalWeather(features, name);

                    }, function (error) {
                        console.log(error);
                    });

                }

                break;
            case 'Police Cameras':
                if (typeof maplayers[name] != 'undefined') {
                    // map1.getLayer(name).clear()
                }
                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'Police Cameras ',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: {
                            lineWidth: 5,
                            lineColor: '#0900FF'
                        }
                    }).addTo(map1);
                    // maplayers[name].hide();
                }
                if (jdata == 'server') {
                    var p = server_GeoApi.getCameraLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);
                        console.log(features)
                        bindLayersFunc.drawFeaturPoliceCamera(features[0][0], name);
                    }, function (error) {
                        console.log(error);
                    });
                }

                break;
            case 'Address':

                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'Address / Locations',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: {
                            lineWidth: 1,
                            lineColor: '#FF0000'
                        }
                    }).addTo(map1);
                }
                // maplayers[name].hide();

                if (jdata == 'server') {
                    var p = server_GeoApi.getAddressLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);
                        bindLayersFunc.drawFeatureAddress(features.features, name);
                    }, function (error) {
                        console.log(error);
                    });

                }


                break;
            case 'Address Alias':

                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'Address / Locations',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: {
                            lineWidth: 1,
                            lineColor: '#FF0000'
                        }
                    }).addTo(map1);
                }
                // maplayers[name].hide();

                if (jdata == 'server') {
                    var p = server_GeoApi.getAddressAliasLayer();
                    p.then(function (data) {
                        var features = JSON.parse(data);
                        bindLayersFunc.drawFeatureAddressAlias(features.features, name);
                    }, function (error) {
                        console.log(error);
                    });
                }


                break;
            case 'Local Sea Vessels':

                if (typeof maplayers[name] == 'undefined') {
                    maplayers[name] = new maptalks.VectorLayer(name, {
                        layerDescription: 'Local Sea vessels coverage area map',
                        enableAltitude: true,
                        // draw altitude
                        drawAltitude: {
                            lineWidth: 1,
                            lineColor: '#FF0000'
                        }
                    }).addTo(map1);
                }
                // maplayers[name].hide();

                if (jdata == 'server') {
                    var p = server_GeoApi.getLocalSeaVesselLayer();
                    p.then(function (data) {

                        var features = JSON.parse(data);
                        bindLayersFunc.drawFeatureLocalSeaVessls(features, 'Local Sea Vessels');

                    }, function (error) {
                        console.log(error);
                    });

                }


                break;
            case 'Road Junctions':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Road junctions ',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                maplayers[name].hide();
                if (jdata != null) {
                    bindLayersFunc.drawFeaturRoadJunctions(jdata.features, name);
                }
                break;
            case 'Maldives Divisions':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Administrative divisions of maldives',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                maplayers[name].hide();
                if (jdata != null) {
                    bindLayersFunc.drawFeatureMaldivesDivisions(jdata.features, name);
                }
                break;
            case 'Male Buildings':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Administrative divisions of maldives',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                //maplayers[name].hide();

                if (jdata != null) {
                    bindLayersFunc.drawFeatureMaleBuildings(jdata.features, name);
                }
                break;
            case 'Island names':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Labels of all islands in Maldives',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                maplayers[name].hide();
                if (jdata != null) {
                    bindLayersFunc.drawFeatureMaldivesIslands(jdata.features, name);
                }
                break;
            case 'Tetra Coverage':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Tetra coverage area map',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                maplayers[name].hide();
                if (jdata != null) {
                    bindLayersFunc.drawFeatureTetraCoverage(jdata.features, name);
                }
                break;

            case 'Island Boundries':
                maplayers[name] = new maptalks.VectorLayer(name, {
                    layerDescription: 'Local island land bounries',
                    enableAltitude: true,
                    // draw altitude
                    drawAltitude: {
                        lineWidth: 1,
                        lineColor: '#0000FF'
                    }
                }).addTo(map1);
                maplayers[name].hide();
                if (jdata != null) {
                    bindLayersFunc.drawFeatureMaldivesIslandBountry(jdata.features, name);
                }
                break;
        }
    },
    drawFeaturRoadJunctions: function (features, name) {

        var ix = 0;
        features.forEach(function (feature) {

            var circle = new maptalks.Circle(feature.geometry.coordinates, 8, {
                symbol: {
                    textName: ix,
                    textSize: '14',
                    textFill: '#7C7B7B',
                    lineColor: '#34495e',
                    lineWidth: 2,
                    lineOpacity: 0.4,
                    polygonFill: '#1bbc9b',
                    polygonOpacity: 0.4
                }

            });
            ix = ix + 1;
            map1.getLayer(name).addGeometry(circle).bringToBack();


            //  var v = maptalks.GeoJSON.toGeometry(feature).addTo(map1.getLayer(name));

            //bindLayersFunc.renderEJS(jdata.features, name);
            // mapFeatures[name].push(v)
        });


    },
    drawFeaturSearchResult: function (features, name) {
      
        if(features!=null){
        features.forEach(function (feature) {
         var adname = feature.name_eng.split(/[^a-zA-Z0-9]+/);;
         console.log(adname)
         var  myaltp=0;
         var  myaltl=1;
         var glRes = map1.getGLRes();
          if(adname[0]=='Hiyaa'){
            myaltl=  (map1.altitudeToPoint(parseInt(adname[2]), map1._getResolution())* sign(parseInt(adname[2])))
            myaltp=  (map1.altitudeToPoint(parseInt(adname[2]), map1._getResolution())* sign(parseInt(adname[2])))
          }
          console.log((map1.altitudeToPoint(parseInt(adname[2]), map1._getResolution())))
          console.log(glRes)
          console.log(myaltl)
          console.log(adname[2])
      
         if (maplayerObjUQ[name].includes('SRESULT_' + feature.addressid) == false) {
                maplayerObjUQ[name].push('SRESULT_' + feature.addressid)
                var marker = new maptalks.Marker(
                    [feature.lng,feature.lat], {
                       
                            'properties': {
                              
                                altitude: myaltp
                            },
                            'draggable' : true,
                        'symbol': {
                            'markerType': 'ellipse',
                            'markerFill': 'rgb(135,196,240)',
                            'markerFillOpacity': 1,
                            'markerLineColor': '#34495e',
                            'markerLineWidth': 1,
                            'markerLineOpacity': 1,
                            'markerLineDasharray': [],
                            'markerWidth': 10,
                            'markerHeight': 10,
                            'markerDx': 0,
                            'markerDy': 0,
                            'markerOpacity': 1
                        }
                    }
                )

                var label = new maptalks.Label(feature.name_eng,
                [feature.lng,feature.lat],
                
                {
                    'properties': {
                      
                        altitude: myaltl
                    },
                    'draggable' : true,
                  'textSymbol': {
                    'textFaceName' : 'monospace',
                    'textFill' : '#fff',
                    'textHaloFill' : '#34495e',
                    'textHaloRadius' : 1,
                    'textSize' : 16,
                    'textVerticalAlignment' : 'top'
                  }
                });

                map1.getLayer(name).addGeometry(label,marker);

            }
        })
    }
    },
    drawFeaturPoliceCamera: function (features, name) {
        var zoom = map1.getZoom();

        if (zoom >= 18) {


            features.forEach(function (feature) {

                if (maplayerObjUQ[name].includes('PCAMRA_' + feature.cam_id) == false) {


                    maplayerObjUQ[name].push('PCAMRA_' + feature.cam_id)

                    var aStart = Number(feature.cam_direction) + feature.cam_fov / 2;
                    var aEnd = Number(feature.cam_direction) - feature.cam_fov / 2;
                    var latlng = [feature.cam_lon, feature.cam_lat];
                    var deapth = feature.cam_depth


                    var sector = new maptalks.Sector(latlng, deapth, aStart, aEnd, {
                        symbol: {
                            lineColor: '#FF0000',
                            lineWidth: 2,
                            lineOpacity: {
                                stops: [
                                    [17, 0.0],
                                    [18, 0.3]
                                ]
                            },
                            polygonFill: 'rgb(216,115,149)',
                            polygonOpacity: {
                                stops: [
                                    [17, 0.0],
                                    [18, 0.2]
                                ]
                            },

                        },
                        properties: {
                            altitude: 12
                        }
                    });

                    // blue circle

                    var marker = new maptalks.Marker(
                        latlng, {
                            'properties': {
                                name: '',
                                altitude: 12
                            },
                            'symbol': {
                                'textFaceName': 'sans-serif',
                                'textName': '{name}', //value from name in geometry's properties
                                'textWeight': 'normal', //'bold', 'bolder'
                                'textStyle': 'normal', //'italic', 'oblique'
                                'textSize': {
                                    stops: [
                                        [12, 2],
                                        [14, 16]
                                    ]
                                },
                                'textFont': null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
                                'textFill': '#4382EE',
                                'textOpacity': 0.6,
                                'textHaloFill': '#34495e',
                                'textHaloRadius': 1,
                                'textWrapWidth': null,
                                'textWrapCharacter': '\n',
                                'textLineSpacing': 0,

                                'textDx': 0,
                                'textDy': 0,

                                'textHorizontalAlignment': 'middle', //left | middle | right | auto
                                'textVerticalAlignment': 'middle', // top | middle | bottom | auto
                                'textAlign': 'center' //left | right | center | auto
                            }
                        })



                    map1.getLayer(name).addGeometry(sector, marker);
                }
            });
        }
    },
    drawFeaturNationalWeather: function (features, name) {
        features.forEach(function (feature) {
            if (maplayerObjUQ[name].includes('NWEATHER_' + feature.site_id) == false) {
                maplayerObjUQ[name].push(feature.site_id)
                var point = new maptalks.Marker(
                    [feature.lon, feature.lat], {
                        visible: true,
                        content: '<div class="thought">' + feature.w_type + ' ' + feature.w_desc + '</div>',
                        editable: false,
                        cursor: 'pointer',
                        draggable: false,
                        dragShadow: false, // display a shadow during dragging
                        drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                        symbol: {
                            'textSize': '14',
                            'textFill': '#7C7B7B',
                            'textFaceName': 'sans-serif',

                            'textHorizontalAlignment': 'right',
                            'textSize': 20
                        },
                        properties: {
                            altitude: 100
                        },
                    }
                );

                map1.getLayer(name).addGeometry(point).bringToBack();


                var marker = new maptalks.ui.UIMarker([feature.lon, feature.lat], {
                    'draggable': true,
                    'single': false,
                    'content': '<div class="thought">' + feature.w_type + ' <br>Sunrise: ' + feature.sunrise + ' <br>Sunset: ' + feature.sunset + '<br>Temperature: ' + feature.w_temp + '<br>Humidity: ' + feature.w_humidity + '</div>',
                    properties: {
                        altitude: 100
                    },
                });
                console.log(marker)
                // map1.getLayer(name).addGeometry(marker).show();
                marker.addTo(map1.getLayer(name)).show();

            }
        })
    },
    drawFeatureTetraCoverage: function (features, name) {
        features.forEach(function (feature) {
            var circle = new maptalks.Circle(feature.geometry.coordinates, feature.properties.radius, {
                symbol: {
                    lineColor: '#34495e',
                    lineWidth: 2,
                    lineOpacity: 0.4,
                    polygonFill: '#1bbc9b',
                    polygonOpacity: 0.4
                }
            });
            map1.getLayer(name).addGeometry(circle).bringToBack();
        })
    },
    drawFeatureAddressAlias: function (features, name) {
        console.log(name)
        features.forEach(function (feature) {

            if (maplayerObjUQ[name].includes('LADDRESSALIAS_' + feature.properties.id) == false) {
                maplayerObjUQ[name].push(feature.properties.id)

                console.log(feature)
                var text = new maptalks.Marker(
                    feature.geometry.coordinates, {
                        'properties': {
                            altitude: 1,
                            'name': feature.properties.name
                        },
                        'symbol': {
                            'textFaceName': 'faruma',
                            'textName': '{name}', //value from name in geometry's properties
                            'textWeight': 'bolder', //'bold', 'bolder'
                            'textStyle': 'normal', //'italic', 'oblique'
                            'textSize': {

                                stops: [
                                    [17, 1],
                                    [19, 18],
                                    [22, 22]
                                ]

                            },
                            'textFont': null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
                            'textFill': '#7C7B7B',
                            'textOpacity': {
                                stops: [
                                    [17, 0.0],
                                    [19, 1]
                                ]
                            },
                            'textWrapWidth': null,
                            'textWrapCharacter': '\n',
                            'textLineSpacing': 0,

                            'textDx': 0,
                            'textDy': 0,

                            'textHorizontalAlignment': 'middle', //left | middle | right | auto
                            'textVerticalAlignment': 'middle', // top | middle | bottom | auto
                            'textAlign': 'center' //left | right | center | auto
                        }
                    })

                map1.getLayer(name).addGeometry([text]).bringToFront();
            }
        })

    },
    drawFeatureAddress: function (features, name) {

        features.forEach(function (feature) {

            if (maplayerObjUQ[name].includes('LADDRESS_' + feature.properties.id) == false) {
                maplayerObjUQ[name].push(feature.properties.id)


                var text = new maptalks.Marker(
                    feature.geometry.coordinates, {
                        'properties': {
                            altitude: 1,
                            'name': feature.properties.DistrictD + '.' + feature.properties.DhiName
                        },
                        'symbol': {
                            'textFaceName': 'faruma',
                            'textName': '{name}', //value from name in geometry's properties
                            'textWeight': 'bolder', //'bold', 'bolder'
                            'textStyle': 'normal', //'italic', 'oblique'
                            'textSize': {

                                stops: [
                                    [17, 1],
                                    [19, 18],
                                    [22, 22]
                                ]

                            },
                            'textFont': null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
                            'textFill': '#7C7B7B',
                            'textOpacity': {
                                stops: [
                                    [17, 0.0],
                                    [19, 1]
                                ]
                            },
                            'textWrapWidth': null,
                            'textWrapCharacter': '\n',
                            'textLineSpacing': 0,

                            'textDx': 0,
                            'textDy': 0,

                            'textHorizontalAlignment': 'middle', //left | middle | right | auto
                            'textVerticalAlignment': 'middle', // top | middle | bottom | auto
                            'textAlign': 'center' //left | right | center | auto
                        }
                    })

                map1.getLayer(name).addGeometry([text]).bringToFront();
            }
        })

    },
    drawFeatureLocalSeaVessls: function (features, name) {

        features.forEach(function (feature) {
            if (maplayerObjUQ[name].includes('LVESSELS_' + feature.flm_id) == false) {
                maplayerObjUQ[name].push(feature.flm_id)
                var icon = 'ship_orange';
                switch (feature.flm_type) {
                    case 'Fishing Dhoni':
                    case 'Excursion Dhoni':
                    case 'Dhoni':
                        icon = 'ship_green';
                        break;
                    case 'Safari':
                    case 'Speed Boat':
                        icon = 'ship_red';
                        break;


                    case 'Supply Boat':
                    case 'Supply Dhoni':
                        icon = 'ship_blue';
                        break;
                    case 'Tug Boat':
                    case 'Dinghy':
                    case 'Landing Craft':
                        icon = 'ship_purple';
                        break;

                }

                var circle = new maptalks.Marker(
                    [feature.flm_lon, feature.flm_lat], {
                        'symbol': {
                            'markerFile': 'assets/css/images/' + icon + '.png',
                            'markerWidth': {
                                stops: [
                                    [17, 20],
                                    [19, 56]
                                ]
                            },
                            'markerHeight': {
                                stops: [
                                    [17, 20],
                                    [19, 56]
                                ]
                            },

                            'markerType': 'diamond',
                            'markerFill': 'rgb(135,196,240)',
                            'markerFillOpacity': 0.9,
                            'markerLineColor': '#34495e',
                            'markerLineWidth': 1,
                            'markerLineOpacity': 1,
                            'markerLineDasharray': [],

                            'markerDx': 0,
                            'markerDy': 0,
                            'markerOpacity': 0.9
                        }
                    }

                )

                var text = new maptalks.Marker(
                    [feature.flm_lon, feature.flm_lat], {
                        'properties': {
                            altitude: 5,
                            'name': feature.flm_name + '\n ' + feature.flm_type + ' ' + '\n ' + feature.flm_time + ' '
                        },
                        'symbol': {
                            'textFaceName': 'sans-serif',
                            'textName': '{name}', //value from name in geometry's properties
                            'textWeight': 'normal', //'bold', 'bolder'
                            'textStyle': 'normal', //'italic', 'oblique'
                            'textSize': {

                                stops: [
                                    [17, 1],
                                    [19, 16]
                                ]

                            },
                            'textFont': null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
                            'textFill': '#7C7B7B',
                            'textOpacity': {
                                stops: [
                                    [17, 0.0],
                                    [19, 1]
                                ]
                            },


                            'textWrapWidth': null,
                            'textWrapCharacter': '\n',
                            'textLineSpacing': 0,

                            'textDx': 0,
                            'textDy': 0,

                            'textHorizontalAlignment': 'middle', //left | middle | right | auto
                            'textVerticalAlignment': 'middle', // top | middle | bottom | auto
                            'textAlign': 'center' //left | right | center | auto
                        }
                    })

                map1.getLayer(name).addGeometry([circle, text]).bringToBack();
            }
        })
    },
    drawFeatureMaleBuildings: function (features, name) {
        var i = 0;
        features.forEach(function (feature) {



            if (feature.geometry != null) {
                console.log(i)
                console.log(feature)
                var latlng = feature.geometry.coordinates;
                // latlng.push(feature.geometry.coordinates[0])

                var polygon = new maptalks.Polygon(

                    latlng

                    , {
                        visible: true,
                        editable: true,
                        cursor: 'pointer',
                        draggable: true,
                        dragShadow: false, // display a shadow during dragging
                        drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                        symbol: {
                            'lineColor': '#FF0000',
                            'lineWidth': 2,
                            'polygonFill': 'rgb(135,196,240)',
                            'polygonOpacity': 0.6
                        }
                    });

                map1.getLayer(name).addGeometry([polygon]).bringToBack();
                i++;
            } else {
                console.log(feature)
            }



        })
    },
    drawFeatureMaldivesIslands: function (features, name) {
        features.forEach(function (feature) {
            let lblColor = '#fff';
            if (feature.properties.NAME_ENG == '<Null>') {
                feature.properties.NAME_ENG = '*';

            }

            switch (feature.properties.ISLAND_TYPE) {
                case 'INHABITED':
                    lblColor = '#20E62D';
                    break;
                case 'INDUSTRIAL':
                    lblColor = '#66D8F5';
                    break;
                case 'OFFICIAL':
                    lblColor = '#E620BF';
                    break;
                case 'RESORT':
                    lblColor = '#F5AD66';
                    break;
                case 'UNINHABITED':
                    lblColor = '#E64120';
                    break;
                case 'FINOLHU':
                    lblColor = '#902B16';
                    break;
                case 'GIRI':
                    lblColor = '#902B16';
                    break;

            }

            var text = new maptalks.Marker(
                feature.geometry.coordinates, {
                    'properties': {
                        'name': feature.properties.NAME_ENG
                    },
                    'symbol': {
                        'textFaceName': 'sans-serif',
                        'textName': '{name}', //value from name in geometry's properties
                        'textWeight': 'normal', //'bold', 'bolder'
                        'textStyle': 'normal', //'italic', 'oblique'
                        'textSize': {
                            stops: [
                                [12, 2],
                                [14, 16]
                            ]
                        },
                        'textFont': null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
                        'textFill': lblColor,
                        'textOpacity': 0.6,
                        'textHaloFill': '#34495e',
                        'textHaloRadius': 1,
                        'textWrapWidth': null,
                        'textWrapCharacter': '\n',
                        'textLineSpacing': 0,

                        'textDx': 0,
                        'textDy': 0,

                        'textHorizontalAlignment': 'middle', //left | middle | right | auto
                        'textVerticalAlignment': 'middle', // top | middle | bottom | auto
                        'textAlign': 'center' //left | right | center | auto
                    }
                }).addTo(map1.getLayer(name)).bringToBack();

        })
    },
    drawFeatureMaldivesIslandBountry: function (features, name) {
        //  mapFeatures[name] = {}
        features.forEach(function (feature) {

            switch (feature.geometry.type) {
                case 'Polygon':

                    var v = new maptalks.Polygon(feature.geometry.coordinates, {
                        visible: true,
                        editable: true,
                        cursor: 'pointer',
                        draggable: true,
                        dragShadow: true, // display a shadow during dragging
                        drawOnAxis: null, // force dragging stick on a axis, can be: x, y
                        symbol: {
                            'lineColor': '#34495e',
                            'lineWidth': 2,
                            'polygonFill': 'rgb(135,196,240)',
                            'polygonOpacity': 0.6
                        }
                    }).addTo(map1.getLayer(name)).bringToBack();


                    break;
            }
        });

    },
    drawFeatureMaldivesDivisions: function (features, name) {
        //  mapFeatures[name] = {}
        features.forEach(function (feature) {
            //  var v = maptalks.GeoJSON.toGeometry(feature).addTo(map1.getLayer(name));
            switch (feature.geometry.type) {

                case 'LineString':
                    if (feature.geometry.coordinates.length < 3) {
                        var v = new maptalks.LineString(feature.geometry.coordinates, {
                            symbol: {
                                'lineColor': '#FF0000',
                                'lineWidth': 3,
                                'lineOpacity': 0.2,
                            },
                            properties: {
                                'altitude': 0
                            }
                        }).addTo(map1.getLayer(name)).bringToBack();
                    } else {
                        var v = new maptalks.LineString(feature.geometry.coordinates, {
                            symbol: {
                                'lineColor': '#0000FF',
                                'lineWidth': 2,
                                'lineOpacity': 0.7,
                                'textName': feature.properties.name,
                                'textPlacement': 'center',
                                'textOpacity': 1,
                                'textHaloFill': '#34495e',
                                'textHaloRadius': 1,
                                'textFill': '#fff',
                                'textSize': {
                                    stops: [
                                        [7, 2],
                                        [14, 16]
                                    ]
                                }

                            },
                            properties: {
                                'altitude': 0
                            }
                        }).addTo(map1.getLayer(name));
                        const extent = map1.getExtent();
                        const center = v.getCenterInExtent(extent);
                        atoll_list.push({
                            lat: center.x,
                            lang: center.y,
                            name: feature.properties.name
                        })
                    }
                    break;
            }
            //bindLayersFunc.renderEJS(jdata.features, name);
            // mapFeatures[name].push(v)
        });

    },

    renderEJS: function (TEMPLATE, data) {
        return EJS.render(fs.readFileSync(TEMPLATE, {
            encoding: 'utf-8'
        }), data, {
            delimiter: '%'
        })
    }
}



function getMap1Status() {


    var extent = map1.getExtent(),
        ex = [
            '{',
            'xmin:' + extent.xmin.toFixed(5),
            ', ymin:' + extent.ymin.toFixed(5),
            ', xmax:' + extent.xmax.toFixed(5),
            ', ymax:' + extent.xmax.toFixed(5),
            '}'
        ].join('');
    var center = map1.getCenter();

    if (limitSidebar == true) {
        limitSidebarForMap()
    }

    map1_center = [center.x.toFixed(5), center.y.toFixed(5)].join();
    map1_extend = ex;
    map1_zoom = map1.getZoom();



    var mapStatus = [
        'Name : <b>map1</b>',
        'Center : [' + map1_center + ']',
        'Extent : ' + ex,
        'Size : ' + map1.getSize().toArray().join(),
        'Zoom : ' + map1_zoom,
        'MinZoom : ' + map1.getMinZoom(),
        'MaxZoom : ' + map1.getMaxZoom(),
        'Pitch : ' + map1.getPitch().toFixed(5),
        'Bearing : ' + map1.getBearing().toFixed(5),
        'Projection : ' + map1.getProjection().code
    ];

    document.cookie = "map_center=" + center.x + ',' + center.y;
    document.cookie = "map_zoom=" + map1_zoom;
    document.cookie = "map_pitch=" + map1.getPitch();
    document.cookie = "map_bearing=" + map1.getBearing();
    $('.map1_zoom').html(parseFloat(map1_zoom).toFixed(2));
    // var mapJSON = map1.toJSON();
    //document.getElementById('map1-json').innerHTML = JSON.stringify(mapJSON);
   /////////// document.getElementById('map1-info').innerHTML = '<div>' + mapStatus.join('<br>') + '</div>';

}

function getMap2Status() {
    var extent = map2.getExtent(),
        ex = [
            '{',
            'xmin:' + extent.xmin.toFixed(5),
            ', ymin:' + extent.ymin.toFixed(5),
            ', xmax:' + extent.xmax.toFixed(5),
            ', ymax:' + extent.xmax.toFixed(5),
            '}'
        ].join('');
    var center = map2.getCenter();
    var mapStatus = [
        'Name : <b>map2</b>',
        'Center : [' + [center.x.toFixed(5), center.y.toFixed(5)].join() + ']',
        'Extent : ' + ex,
        'Size : ' + map2.getSize().toArray().join(),
        'Zoom : ' + map2.getZoom(),
        'MinZoom : ' + map2.getMinZoom(),
        'MaxZoom : ' + map2.getMaxZoom(),
        'Pitch : ' + map2.getPitch().toFixed(5),
        'Bearing : ' + map2.getBearing().toFixed(5),
        'Projection : ' + map2.getProjection().code
    ];


    document.getElementById('map2-info').innerHTML = '<div>' + mapStatus.join('<br>') + '</div>';
}

var iniMap = {
    maptalkMap1: function (element, x, y, zoom) {


        // map_pitch=0; map_bearing=0; map_zoom=9.113978975325455; map_center=73.56022203803627,4.285711075558737
        var bearing = 0;
        var pitch = 0;
        var lat = x;
        var lng = y;
        var map_cookie = getCookie('map_zoom');

        console.log(map_cookie)
        if (typeof map_cookie !== 'undefined' && map_cookie > 0) {
            zoom = getCookie('map_zoom');
            pitch = getCookie('map_pitch');
            bearing = getCookie('map_bearing');
            var latlng = getCookie('map_center').split(",");
            lat = latlng[0];
            lng = latlng[1];
        } else {
            lat = x;
            lng = y;
        }



        map1 = new maptalks.Map(element, {
            center: [lat, lng],
            zoom: zoom,
            bearing: bearing,
            pitch: pitch,
            centerCross: false,
            doubleClickZoom: true,
            layerSwitcherControl: {
                'position': 'top-right',
                // title of base layers
                'baseTitle': 'Base Layers',
                // title of layers
                'overlayTitle': 'Layers',
                // layers you don't want to manage with layer switcher
                'excludeLayers': [],
                // css class of container element, maptalks-layer-switcher by default
                'containerClass': 'maptalks-layer-switcher'
            },
            baseLayer: new maptalks.GroupTileLayer('Base TileLayer', [
                new maptalks.TileLayer('Carto light', {
                    visible: false,
                    renderer: 'canvas', // set TileLayer's renderer to canvas
                    urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                    subdomains: ["a", "b", "c", "d"],
                    attribution: 'Maldives Police Service'
                }),
                new maptalks.TileLayer('Dark light', {
                    visible: true,
                    renderer: 'canvas', // set TileLayer's renderer to canvas
                    urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                    subdomains: ["a", "b", "c", "d"],
                    attribution: 'Maldives Police Service'
                }),
                new maptalks.TileLayer('Google-map', {
                    visible: false,
                    renderer: 'canvas', // set TileLayer's renderer to canvas
                    urlTemplate: syncpath + 'imageTiles/map/{z}/{y}/{x}.png',
                    subdomains: ['a', 'b', 'c', 'd'],
                    attribution: 'Maldives Police Service'
                }),
                new maptalks.TileLayer('Google-Sat', {
                    visible: false,
                    renderer: 'canvas', // set TileLayer's renderer to canvas
                    urlTemplate: syncpath + 'imageTiles/sat/{z}/{y}/{x}.png',
                    subdomains: ['a', 'b', 'c', 'd'],
                    attribution: 'Maldives Police Service'
                }),
                new maptalks.GroupTileLayer('Google-Hyb', [
                    new maptalks.TileLayer('G-Sat', {
                        visible: false,
                        renderer: 'canvas', // set TileLayer's renderer to canvas
                        urlTemplate: syncpath + 'imageTiles/sat/{z}/{y}/{x}.png',
                        attribution: 'Maldives Police Service'
                    }),
                    new maptalks.TileLayer('G-hyb', {
                        visible: false,
                        urlTemplate: syncpath + 'imageTiles/hyb/{z}/{y}/{x}.png',
                        renderer: 'canvas', // set TileLayer's renderer to canvas
                        attribution: 'Maldives Police Service'
                    })
                ])

            ])
        })
    },
    maptalkMap2: function (element, lat, lng, zoom) {
        map2 = new maptalks.Map(element, {
            center: [lat, lng],
            zoom: zoom,
            baseLayer: new maptalks.TileLayer('base', {
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                subdomains: ["a", "b", "c", "d"],
                attribution: 'Maldives Police Service'
            })

        });

    }
}


var renderArray = {

    renderDeptList: function (subcatList) {
        // subcatList['departmentSubcat'].sort();

        fetch('departmentList', {
                method: "POST",
                body: JSON.stringify({
                    deptlist: subcatList
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => {

                return response.text();
            })
            .then((html) => {
                if($('#accordionDepartments').length!=0){
                    $('#accordionDepartments').append(html)
                }
               
                // document.getElementById('accordionDepartments').innerHTML = html

                // $('#rsidebarmain-rolling').addClass('chat-info-visible');
                // $('#rsidebarmain').removeClass('chat-info-visible');
            });
    },
    renderMyDeptList: function (deptid) {
        subcatList['mysubcats'].sort();

        subcatList['mysubcats'] = subcatList['mysubcats'].filter(elements => {
            return elements !== '';
        });
        subcatList['mysubcats'] = subcatList['mysubcats'].filter(elements => {
            return elements !== null;
        });
        subcatList['mysubcats'] = removeDuplicates(subcatList['mysubcats'])

        fetch('myList', {
                method: "POST",
                body: JSON.stringify({
                    subcatids: subcatList['mysubcats'],
                    deptlist: Object.assign({}, subcatList['deptlist'][deptid])
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => {

                return response.text();
            })
            .then((html) => {
                $('#myaccordionDepartments').append(html)
                // document.getElementById('myaccordionDepartments').innerHTML = html

                // $('#rsidebarmain-rolling').addClass('chat-info-visible');
                // $('#rsidebarmain').removeClass('chat-info-visible');
            });
    },
    renderUnitList: function (unitlist, renterto) {
        fetch('unitList', {
                method: "POST",
                body: JSON.stringify({
                    data: unitlist
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => {
                return response.text();
            })
            .then((html) => {



                $(renterto).append(html)




                // document.getElementById('unitListHtml').innerHTML = html

                // $('#rsidebarmain-rolling').addClass('chat-info-visible');
                // $('#rsidebarmain').removeClass('chat-info-visible');
            });

    },
    regionslist: function (datas, output) {

        for (let i = 0; i < datas.length; i++) {

            var deptData = datas[i];

            var html = '';
            html += '<li class="list-group-item py-2">';
            html += '<div class="media align-items-center">';
            html += '<div class="media-body">';
            html += '<p class="mb-0">' + deptData.name + ' </p>';
            html += '<p class="small text-muted mb-0">' + deptData.description + '</p>';
            html += '</div>';
            html += '<div class="custom-control custom-switch mr-2">';
            html += '   <button onclick="flyto(' + deptData.zoom + ', [' + deptData.coordinates +
                '], ' + deptData.bearing + ', ' + deptData.pitch + ')" id="flyview_' + i +
                '" class="btn btn-outline-default mx-1" type="button">Fly</button>';
            html += '  ';
            html += '</div>';
            html += ' </div>';
            html += ' </li>';
            html = '';
            html = '<a onclick="flyto(' + deptData.zoom + ', [' + deptData.coordinates +
                '], ' + deptData.bearing + ', ' + deptData.pitch + ')" id="flyview_' + i +
                '"  href="#" class="list-group-item list-group-item-action py-3 lh-sm">';
            html += '<div class="d-flex w-100 align-items-center justify-content-between">';
            html += '  <strong class="mb-1 text-info">' + deptData.name + ' </strong>';
            html += '  <small class="text-muted"></small>';
            html += ' </div>';
            html += '  <div class="col-10 mb-1 small">' + deptData.description + '</div>';
            html += ' </a>';

            $(output).append(html);
            document.getElementById('flyview_' + i + '').addEventListener("click", function () {

            });


        }
        $('.flyViewtCnt').html('<b style="color:red;">(' + datas.length + ')</b>');

    },
}

function startMap1(element, lat, lng, zoom) {
    /*
var chartDom = document.createElement('div');
chartDom.style.cssText = 'width:650px; height:300px;';
createChart(chartDom);

var echartsUI = new maptalks.ui.UIMarker([72.62807786276494, 3.210794848938775], {
  'draggable'     : true,
  'content'       : chartDom
}).addTo(map1).show();
*/
}

// ECharts's chart creation
function createChart(dom) {
    var myChart = echarts.init(dom);
    var option = {
        title: {
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        series: [{
            name: 'Area mode',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: [{
                    value: 10,
                    name: 'rose1'
                },
                {
                    value: 5,
                    name: 'rose2'
                },
                {
                    value: 15,
                    name: 'rose3'
                },
                {
                    value: 25,
                    name: 'rose4'
                },
                {
                    value: 20,
                    name: 'rose5'
                },
                {
                    value: 35,
                    name: 'rose6'
                },
                {
                    value: 30,
                    name: 'rose7'
                },
                {
                    value: 40,
                    name: 'rose8'
                }
            ]
        }]
    };
    myChart.setOption(option);
}


function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}

function arrayRemove(numbers, target) {

    var i = 0;
    while (i < numbers.length) {
        if (numbers[i] === target) {
            numbers.splice(i, 1);
        } else {
            ++i;
        }
    }

}

function sign(x) {
    if (Math.sign) {
      return Math.sign(x);
    }
  
    x = +x;
  
    if (x === 0 || isNaN(x)) {
      return Number(x);
    }
  
    return x > 0 ? 1 : -1;
  }