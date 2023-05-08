  // features to draw
  var features = [];
  var blockfeatures = [];

  var map_labels = [];

  //var gui = new dat.GUI();


  // the ThreeLayer to draw buildings
  var threeLayer = new maptalks.ThreeLayer('3D Objects', {
      forceRenderOnMoving: true,
      forceRenderOnRotating: true,
     animation: true
  });
  var block_meshs = [];
  var meshs = [];
  var material = getBuildingsMaterial();
  material.vertexColors = THREE.VertexColors;
  var material_blocks = new THREE.MeshLambertMaterial({
      color: 'rgb(255,255,255)',
      transparent: true,
      opacity: 0.1
  });
  var block_highlightmaterial = new THREE.MeshBasicMaterial({
      color: '#4FD427',
      transparent: true
  });

  var highlightmaterial = new THREE.MeshBasicMaterial({
      color: 'yellow',
      transparent: true
  });


  //https://zhuanlan.zhihu.com/p/199353080
  const block_lineMaterial = new THREE.LineBasicMaterial({
      // 线的颜色
      color: "rgb(62,148,230)",
      transparent: true,
      linewidth: 1,
      opacity: 0.7,
      //depthTest: true,
  });
  //解决z-flighting
  block_lineMaterial.polygonOffset = true;
  block_lineMaterial.depthTest = true;
  block_lineMaterial.polygonOffsetFactor = 1;
  block_lineMaterial.polygonOffsetUnits = 1.0;

  //https://zhuanlan.zhihu.com/p/199353080
  const lineMaterial = new THREE.LineBasicMaterial({
      // 线的颜色
      color: "rgb(62,148,230)",
      transparent: true,
      linewidth: 1,

      opacity: 0.4,
      //depthTest: true,
  });
  //解决z-flighting
  lineMaterial.polygonOffset = true;
  lineMaterial.depthTest = true;
  lineMaterial.polygonOffsetFactor = 1;
  lineMaterial.polygonOffsetUnits = 1.0;

  var render3D = {

    generateBlock: function (blocks,layertType) {

        blocks.forEach(function (b) {
            blockfeatures = blockfeatures.concat(b.features);
        });
        // var material = new THREE.MeshBasicMaterial({ color: '#3e35cf' });
        // material.vertexColors = THREE.VertexColors;
        blockfeatures.forEach(function (g) {
            console.log(g)
            var cus_material = material_blocks;
            var levels = 1;
            if (typeof g !== "undefined" && g !== null) {
                if (typeof g.properties.color !== "undefined" && g.properties.color !== null) {
                    cus_material = new THREE.MeshLambertMaterial({
                        color: g.properties.color,
                        transparent: true,
                        opacity: 0.8
                    });
                }
  
                if (typeof g.properties.levels !== "undefined" && g.properties.levels !== null) {
                    levels = g.properties.levels
                }
            }
            var heightPerLevel = 0.1;
            var tcolor = 'rgb(93,0,245)';
            switch(layertType){
                case 'mob':
                    heightPerLevel = 0
                  
                break;
                case 'iob':
                    heightPerLevel = 0.2
                     
                  
                break;
                case 'izb':
                    heightPerLevel = 0.4
                    
                  
                break;
                case 'zbb':
                    heightPerLevel = 0.6
                      
                  
                break;
                case 'bob':
                    heightPerLevel = 0.1
                break;
        }


            var mesh = threeLayer.toExtrudePolygon(maptalks.GeoJSON.toGeometry(g), {
                height: levels * heightPerLevel,
                topColor: tcolor,
                asynchronous: false,
                map_objectID: g.object_properties['Geometry table'].object_id
            }, cus_material);

          
           // mesh.setAltitude(0);
            /*
          //tooltip test
         mesh.setToolTip(levels * heightPerLevel, {
             showTimeout: 0,
             eventsPropagation: true,
             dx: 10
         });
     
         //infowindow test
         mesh.setInfoWindow({
             content: 'hello world,height:' + levels * heightPerLevel,
             title: 'message',
             animationDuration: 0,
             autoOpenOn: false
         });
      */
            // mesh.getInfoWindow().addTo(map);
  
            //event test
            ['click', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                mesh.on(eventType, function (e) {
                    if (e.type === 'click') {
                        template.mapObjectView(e.target.options.map_objectID)
                        console.log(e.type, e);
                        console.log(e.target.options);
                    }
                    if (e.type === 'mouseout') {
                        this.setSymbol(cus_material);
                    }
                    if (e.type === 'mouseover') {
                        this.setSymbol(block_highlightmaterial);
                    }
                });
            });
            // initVertexColors(mesh.geometry, '#2d2f61', '#fff');
            block_meshs.push(mesh);
  
            var outLine = new OutLine(mesh, {
                interactive: false
            }, block_lineMaterial, threeLayer);
            block_meshs.push(outLine);
            // if (Array.isArray(mesh)) {
            //     scene.add.apply(scene, mesh);
            // } else {
            //     scene.add(mesh);
            // }
        });
  
        threeLayer.addMesh(block_meshs);
        block_meshs[0].on('show hide symbolchange', function (e) {
            console.log(e.type, e);
        });
    },
    generateBuildings: function (buildings) {
        console.log(buildings)
        buildings.forEach(function (b) {
            features = features.concat(b.features);
        });
        features.forEach(function (g) {
  
            var cus_material = material;
            var levels = 1;
            if (typeof g !== "undefined" && g != null && g.properties !== "undefined"   && g.properties != null) {
  
                if (typeof g.properties.color !== "undefined" && g.properties.color != null) {
                    cus_material = new THREE.MeshLambertMaterial({
                        color: g.properties.color,
                        transparent: true,
                        opacity: 0.8
                    });
                }
  
                if (typeof g.properties.levels !== "undefined" && g.properties.levels != null) {
                    levels = g.properties.levels
                }
            }
            var heightPerLevel = 5;
  
            var mesh = threeLayer.toExtrudePolygon(maptalks.GeoJSON.toGeometry(g), {
                height: levels * heightPerLevel,
                topColor: '#909091',
                asynchronous: false,
                map_objectID: g.object_properties['Geometry table'].object_id
            }, cus_material);
  
         
            /*
            var label = new maptalks.Label(g.properties.name,
                mesh.geometry,
                {
                  'draggable' : true,
                  'textSymbol': {
                    'textFaceName' : 'monospace',
                    'textFill' : '#34495e',
                    'textHaloFill' : '#fff',
                    'textHaloRadius' : 4,
                    'textSize' : 18,
                    'textWeight' : 'bold',
                    'textVerticalAlignment' : 'top'
                  },  properties : {
                    altitude : levels * heightPerLevel
                  }
                });
            
                map_labels.push(label)
        */
  
            //tooltip test
            mesh.setToolTip(g.object_properties['Geometry table'].object_id, {
                showTimeout: 0,
                eventsPropagation: true,
                dx: 10
            });
  
            //infowindow test
            mesh.setInfoWindow({
                content: '' +  g.object_properties['Geometry table'].object_id,
                title: 'message',
                animationDuration: 0,
                autoOpenOn: false
            });
  
            // mesh.getInfoWindow().addTo(map);
  
            //event test
            ['click', 'mousemove', 'mouseout', 'mouseover', 'mousedown', 'mouseup', 'dblclick', 'contextmenu'].forEach(function (eventType) {
                mesh.on(eventType, function (e) {
                    if (e.type === 'click') {
                        console.log(e.type, e);
                        console.log(e.target);
                        e.target.picked
                        console.log(e.target.toolTip._coordinate);
                    }
                    if (e.type === 'mouseout') {
                        this.setSymbol(cus_material);
                    }
                    if (e.type === 'mouseover') {
                        this.setSymbol(highlightmaterial);
                    }
                });
            });
  
  
  
            // initVertexColors(mesh.geometry, '#2d2f61', '#fff');
            meshs.push(mesh);
  
            var outLine = new OutLine(mesh, {
                interactive: false
            }, lineMaterial, threeLayer);
            meshs.push(outLine);
            // if (Array.isArray(mesh)) {
            //     scene.add.apply(scene, mesh);
            // } else {
            //     scene.add(mesh);
            // }
        });
  
        threeLayer.addMesh(meshs);
        meshs[0].on('show hide symbolchange', function (e) {
            console.log(e.type, e);
        });

    }

  }
 

 
  function init3dRender() {

      threeLayer.prepareToDraw = function (gl, scene, camera) {
          stats = new Stats();
          stats.domElement.style.zIndex = 100;
          document.getElementById('map1').appendChild(stats.domElement);


          var light = new THREE.DirectionalLight(0xffffff);
          light.position.set(0, -10, 10).normalize();
          scene.add(light);
          scene.add(new THREE.AmbientLight('#fff', 0.2));
         // initGui();
          threeLayer.config('animation', true);
          animation();
      };


      const sceneConfig = {
          postProcess: {
              enable: true,
              antialias: {
                  enable: true
              }
          }
      };
      const groupLayer = new maptalks.GroupGLLayer('3D Layer', [threeLayer], {
          sceneConfig
      });
      groupLayer.addTo(map1);

  }






  function animation() {
      // layer animation support Skipping frames
      if (!map1.isInteracting()) {
          threeLayer._needsUpdate = !threeLayer._needsUpdate;
          if (threeLayer._needsUpdate) {
              threeLayer.redraw();
          }
      }
      stats.update();
      requestAnimationFrame(animation);
  }

  function initGui() {
      var params = {
          add: true,
          color: material.color.getStyle(),
          show: true,
          opacity: 1,
          altitude: 0,
          lineColor: lineMaterial.color.getStyle(),
          lineOpacity: lineMaterial.opacity,
          animateShow: animateShow
      };
      
      gui.add(params, 'add').name('Add / Remove Buildings').onChange(function () {
          if (params.add) {
              threeLayer.addMesh(meshs);
          } else {
              threeLayer.removeMesh(meshs);
          }
      });

      gui.addColor(params, 'color').name('Building color').onChange(function () {
          material.color.set(params.color);
      });
      gui.addColor(params, 'lineColor').name('Line color').onChange(function () {
          lineMaterial.color.set(params.lineColor);
      });

      gui.add(params, 'lineOpacity', 0, 1).name('Line opacity').onChange(function () {
          lineMaterial.opacity = params.lineOpacity;
      });
      gui.add(params, 'opacity', 0, 1).name('Building opacity').onChange(function () {
          material.opacity = params.opacity;
      });


      gui.add(params, 'add').name('Add / Remove Blocks').onChange(function () {
          if (params.add) {
              threeLayer.addMesh(block_meshs);
          } else {
              threeLayer.removeMesh(block_meshs);
          }
      });

      gui.addColor(params, 'color').name('Block color').onChange(function () {
          material_blocks.color.set(params.color);
      });
      gui.addColor(params, 'lineColor').name('Line color').onChange(function () {
          block_lineMaterial.color.set(params.lineColor);
      });

      gui.add(params, 'lineOpacity', 0, 1).name('Line opacity').onChange(function () {
          block_lineMaterial.opacity = params.lineOpacity;
      });
      gui.add(params, 'opacity', 0, 1).name('Block opacity').onChange(function () {
          material_blocks.opacity = params.opacity;
      });


      gui.add(params, 'show').name('Show/ hide').onChange(function () {
          meshs.forEach(function (mesh) {
              if (params.show) {
                  mesh.show();
              } else {
                  mesh.hide();
              }
          });
      });

      gui.add(params, 'altitude', 0, 300).name('Altitude').onChange(function () {
          meshs.forEach(function (mesh) {
              mesh.setAltitude(params.altitude);
          });
      });
      gui.add(params, 'animateShow').name('Animate Show');
  }

  function animateShow() {
      meshs.forEach(function (mesh) {
          mesh.animateShow({
              duration: 5000
          });
      });
  }

  function getBuildingsMaterial(color = 'red') {
      const material = new THREE.MeshPhongMaterial({
          // map: texture,
          transparent: true,
          color: 'rgb(93,0,245)'
      });
      return material;
  }

  //default values
  var OPTIONS = {
      altitude: 0,
      draggable : true,
  };

  //https://zhuanlan.zhihu.com/p/199353080
  class OutLine extends maptalks.BaseObject {
      constructor(mesh, options, material, layer) {
          options = maptalks.Util.extend({}, OPTIONS, options, {
              layer
          });
          super();
          //Initialize internal configuration
          // https://github.com/maptalks/maptalks.three/blob/1e45f5238f500225ada1deb09b8bab18c1b52cf2/src/BaseObject.js#L135
          this._initOptions(options);

          const edges = new THREE.EdgesGeometry(mesh.getObject3d().geometry, 1);
          const lineS = new THREE.LineSegments(edges, material);
          this._createGroup();
          this.getObject3d().add(lineS);
          //Initialize internal object3d
          // https://github.com/maptalks/maptalks.three/blob/1e45f5238f500225ada1deb09b8bab18c1b52cf2/src/BaseObject.js#L140

          //set object3d position
          this.getObject3d().position.copy(mesh.getObject3d().position);
      }
  }