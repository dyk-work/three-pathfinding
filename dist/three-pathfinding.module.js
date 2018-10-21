var e=function(){};e.computeCentroids=function(e){var t,r,n;for(t=0,r=e.faces.length;t<r;t++)(n=e.faces[t]).centroid=new THREE.Vector3(0,0,0),n.centroid.add(e.vertices[n.a]),n.centroid.add(e.vertices[n.b]),n.centroid.add(e.vertices[n.c]),n.centroid.divideScalar(3)},e.roundNumber=function(e,t){return Number(e.toFixed(t))},e.sample=function(e){return e[Math.floor(Math.random()*e.length)]},e.mergeVertexIds=function(e,t){var r=[];if(e.forEach(function(e){t.indexOf(e)>=0&&r.push(e)}),r.length<2)return[];r.includes(e[0])&&r.includes(e[e.length-1])&&e.push(e.shift()),r.includes(t[0])&&r.includes(t[t.length-1])&&t.push(t.shift()),r=[],e.forEach(function(e){t.includes(e)&&r.push(e)});for(var n=r[1],o=r[0],i=e.slice();i[0]!==n;)i.push(i.shift());for(var s=0,a=t.slice();a[0]!==o;)if(a.push(a.shift()),s++>10)throw new Error("Unexpected state");return a.shift(),a.pop(),i=i.concat(a)},e.setPolygonCentroid=function(e,t){var r=new THREE.Vector3,n=t.vertices;e.vertexIds.forEach(function(e){r.add(n[e])}),r.divideScalar(e.vertexIds.length),e.centroid.copy(r)},e.cleanPolygon=function(e,t){for(var r=[],n=t.vertices,o=0;o<e.vertexIds.length;o++){var i,s,a,h=n[e.vertexIds[o]];0===o?(i=e.vertexIds[1],s=e.vertexIds[e.vertexIds.length-1]):o===e.vertexIds.length-1?(i=e.vertexIds[0],s=e.vertexIds[e.vertexIds.length-2]):(i=e.vertexIds[o+1],s=e.vertexIds[o-1]),a=n[s];var c=n[i].clone().sub(h),u=a.clone().sub(h),l=c.angleTo(u);if(l>Math.PI-.01&&l<Math.PI+.01){var d=[];e.neighbours.forEach(function(t){t.vertexIds.includes(e.vertexIds[o])||d.push(t)}),e.neighbours=d}else r.push(e.vertexIds[o])}e.vertexIds=r,this.setPolygonCentroid(e,t)},e.isConvex=function(e,t){var r=t.vertices;if(e.vertexIds.length<3)return!1;for(var n=!0,o=[],i=0;i<e.vertexIds.length;i++){var s,a,h=r[e.vertexIds[i]];0===i?(s=r[e.vertexIds[1]],a=r[e.vertexIds[e.vertexIds.length-1]]):i===e.vertexIds.length-1?(s=r[e.vertexIds[0]],a=r[e.vertexIds[e.vertexIds.length-2]]):(s=r[e.vertexIds[i+1]],a=r[e.vertexIds[i-1]]);var c=s.clone().sub(h),u=a.clone().sub(h),l=c.angleTo(u);if(l===Math.PI||0===l)return!1;var d=c.cross(u).y;o.push(d)}return o.forEach(function(e){0===e&&(n=!1)}),o.forEach(o[0]>0?function(e){e<0&&(n=!1)}:function(e){e>0&&(n=!1)}),n},e.distanceToSquared=function(e,t){var r=e.x-t.x,n=e.y-t.y,o=e.z-t.z;return r*r+n*n+o*o},e.isPointInPoly=function(e,t){for(var r=!1,n=-1,o=e.length,i=o-1;++n<o;i=n)(e[n].z<=t.z&&t.z<e[i].z||e[i].z<=t.z&&t.z<e[n].z)&&t.x<(e[i].x-e[n].x)*(t.z-e[n].z)/(e[i].z-e[n].z)+e[n].x&&(r=!r);return r},e.isVectorInPolygon=function(e,t,r){var n=1e5,o=-1e5,i=[];return t.vertexIds.forEach(function(e){n=Math.min(r[e].y,n),o=Math.max(r[e].y,o),i.push(r[e])}),!!(e.y<o+.5&&e.y>n-.5&&this.isPointInPoly(i,e))},e.triarea2=function(e,t,r){return(r.x-e.x)*(t.z-e.z)-(t.x-e.x)*(r.z-e.z)},e.vequal=function(e,t){return this.distanceToSquared(e,t)<1e-5};var t=function(e){this.content=[],this.scoreFunction=e};t.prototype.push=function(e){this.content.push(e),this.sinkDown(this.content.length-1)},t.prototype.pop=function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},t.prototype.remove=function(e){var t=this.content.indexOf(e),r=this.content.pop();t!==this.content.length-1&&(this.content[t]=r,this.scoreFunction(r)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},t.prototype.size=function(){return this.content.length},t.prototype.rescoreElement=function(e){this.sinkDown(this.content.indexOf(e))},t.prototype.sinkDown=function(e){for(var t=this.content[e];e>0;){var r=(e+1>>1)-1,n=this.content[r];if(!(this.scoreFunction(t)<this.scoreFunction(n)))break;this.content[r]=t,this.content[e]=n,e=r}},t.prototype.bubbleUp=function(e){for(var t=this.content.length,r=this.content[e],n=this.scoreFunction(r);;){var o=e+1<<1,i=o-1,s=null,a=void 0;if(i<t)(a=this.scoreFunction(this.content[i]))<n&&(s=i);if(o<t)this.scoreFunction(this.content[o])<(null===s?n:a)&&(s=o);if(null===s)break;this.content[e]=this.content[s],this.content[s]=r,e=s}};var r=function(){};r.init=function(e){for(var t=0;t<e.length;t++){var r=e[t];r.f=0,r.g=0,r.h=0,r.cost=1,r.visited=!1,r.closed=!1,r.parent=null}},r.cleanUp=function(e){for(var t=0;t<e.length;t++){var r=e[t];delete r.f,delete r.g,delete r.h,delete r.cost,delete r.visited,delete r.closed,delete r.parent}},r.heap=function(){return new t(function(e){return e.f})},r.search=function(e,t,r){this.init(e);var n=this.heap();for(n.push(t);n.size()>0;){var o=n.pop();if(o===r){for(var i=o,s=[];i.parent;)s.push(i),i=i.parent;return this.cleanUp(s),s.reverse()}o.closed=!0;for(var a=this.neighbours(e,o),h=0,c=a.length;h<c;h++){var u=a[h];if(!u.closed){var l=o.g+u.cost,d=u.visited;if(!d||l<u.g){if(u.visited=!0,u.parent=o,!u.centroid||!r.centroid)throw new Error("Unexpected state");u.h=u.h||this.heuristic(u.centroid,r.centroid),u.g=l,u.f=u.g+u.h,d?n.rescoreElement(u):n.push(u)}}}}return[]},r.heuristic=function(t,r){return e.distanceToSquared(t,r)},r.neighbours=function(e,t){for(var r=[],n=0;n<t.neighbours.length;n++)r.push(e[t.neighbours[n]]);return r};var n=1,o=function(){};o.buildZone=function(t){var r=this,n=this._buildNavigationMesh(t),o={};n.vertices.forEach(function(t){t.x=e.roundNumber(t.x,2),t.y=e.roundNumber(t.y,2),t.z=e.roundNumber(t.z,2)}),o.vertices=n.vertices;var i=this._buildPolygonGroups(n);o.groups=[];var s=function(e,t){for(var r=0;r<e.length;r++)if(t===e[r])return r};return i.forEach(function(t){var n=[];t.forEach(function(o){var i=o.neighbours.map(function(e){return s(t,e)}),a=o.neighbours.map(function(e){return r._getSharedVerticesInOrder(o,e)});o.centroid.x=e.roundNumber(o.centroid.x,2),o.centroid.y=e.roundNumber(o.centroid.y,2),o.centroid.z=e.roundNumber(o.centroid.z,2),n.push({id:s(t,o),neighbours:i,vertexIds:o.vertexIds,centroid:o.centroid,portals:a})}),o.groups.push(n)}),o},o._buildNavigationMesh=function(t){return e.computeCentroids(t),t.mergeVertices(),this._buildPolygonsFromGeometry(t)},o._buildPolygonGroups=function(e){var t=[],r=0,n=function(e){e.neighbours.forEach(function(t){void 0===t.group&&(t.group=e.group,n(t))})};return e.polygons.forEach(function(e){void 0===e.group&&(e.group=r++,n(e)),t[e.group]||(t[e.group]=[]),t[e.group].push(e)}),t},o._buildPolygonNeighbours=function(e,t,r){var n=new Set,o=r.get(e.vertexIds[0]),i=r.get(e.vertexIds[1]),s=r.get(e.vertexIds[2]);o.forEach(function(r){t.polygons[r]!==e&&(i.has(r)||s.has(r))&&n.add(t.polygons[r])}),i.forEach(function(r){t.polygons[r]!==e&&s.has(r)&&n.add(t.polygons[r])}),e.neighbours=Array.from(n)},o._buildPolygonsFromGeometry=function(e){for(var t=this,r=[],o=e.vertices,i=e.faceVertexUvs,s=new Map,a=0;a<o.length;a++)s.set(a,new Set);e.faces.forEach(function(e){r.push({id:n++,vertexIds:[e.a,e.b,e.c],centroid:e.centroid,normal:e.normal,neighbours:[]}),s.get(e.a).add(r.length-1),s.get(e.b).add(r.length-1),s.get(e.c).add(r.length-1)});var h={polygons:r,vertices:o,faceVertexUvs:i};return r.forEach(function(e){t._buildPolygonNeighbours(e,h,s)}),h},o._getSharedVerticesInOrder=function(e,t){var r=e.vertexIds,n=t.vertexIds,o=new Set;if(r.forEach(function(e){n.includes(e)&&o.add(e)}),o.size<2)return[];o.has(r[0])&&o.has(r[r.length-1])&&r.push(r.shift()),o.has(n[0])&&o.has(n[n.length-1])&&n.push(n.shift());var i=[];return r.forEach(function(e){n.includes(e)&&i.push(e)}),i};var i=function(){this.portals=[]};i.prototype.push=function(e,t){void 0===t&&(t=e),this.portals.push({left:e,right:t})},i.prototype.stringPull=function(){var t,r,n,o=this.portals,i=[],s=0,a=0,h=0;r=o[0].left,n=o[0].right,i.push(t=o[0].left);for(var c=1;c<o.length;c++){var u=o[c].left,l=o[c].right;if(e.triarea2(t,n,l)<=0){if(!(e.vequal(t,n)||e.triarea2(t,r,l)>0)){i.push(r),r=t=r,n=t,a=s=a,h=s,c=s;continue}n=l,h=c}if(e.triarea2(t,r,u)>=0){if(!(e.vequal(t,r)||e.triarea2(t,n,u)<0)){i.push(n),r=t=n,n=t,a=s=h,h=s,c=s;continue}r=u,a=c}}return 0!==i.length&&e.vequal(i[i.length-1],o[o.length-1].left)||i.push(o[o.length-1].left),this.path=i,i};var s,a=function(){this.zones={}};a.createZone=function(e){return e.isGeometry?console.warn("[three-pathfinding]: Use THREE.BufferGeometry, not THREE.Geometry, to create zone."):e=(new THREE.Geometry).fromBufferGeometry(e),o.buildZone(e)},a.prototype.setZoneData=function(e,t){this.zones[e]=t},a.prototype.getRandomNode=function(t,r,n,o){if(!this.zones[t])return new THREE.Vector3;n=n||null,o=o||0;var i=[];return this.zones[t].groups[r].forEach(function(t){n&&o?e.distanceToSquared(n,t.centroid)<o*o&&i.push(t.centroid):i.push(t.centroid)}),e.sample(i)||new THREE.Vector3},a.prototype.getClosestNode=function(t,r,n,o){void 0===o&&(o=!1);var i=this.zones[r].vertices,s=null,a=Infinity;return this.zones[r].groups[n].forEach(function(r){var n=e.distanceToSquared(r.centroid,t);n<a&&(!o||e.isVectorInPolygon(t,r,i))&&(s=r,a=n)}),s},a.prototype.findPath=function(e,t,n,o){var s=this.zones[n].groups[o],a=this.zones[n].vertices,h=this.getClosestNode(e,n,o,!0),c=this.getClosestNode(t,n,o,!0);if(!h||!c)return null;var u=r.search(s,h,c),l=function(e,t){for(var r=0;r<e.neighbours.length;r++)if(e.neighbours[r]===t.id)return e.portals[r]},d=new i;d.push(e);for(var p=0;p<u.length;p++){var f=u[p+1];if(f){var v=l(u[p],f);d.push(a[v[0]],a[v[1]])}}d.push(t),d.stringPull();var g=d.path.map(function(e){return new THREE.Vector3(e.x,e.y,e.z)});return g.shift(),g},a.prototype.getGroup=(s=new THREE.Plane,function(t,r,n){if(void 0===n&&(n=!1),!this.zones[t])return null;for(var o=null,i=Math.pow(50,2),a=this.zones[t],h=0;h<a.groups.length;h++)for(var c=0,u=a.groups[h];c<u.length;c+=1){var l=u[c];if(n&&(s.setFromCoplanarPoints(a.vertices[l.vertexIds[0]],a.vertices[l.vertexIds[1]],a.vertices[l.vertexIds[2]]),Math.abs(s.distanceToPoint(r))<.01&&e.isPointInPoly([a.vertices[l.vertexIds[0]],a.vertices[l.vertexIds[1]],a.vertices[l.vertexIds[2]]],r)))return h;var d=e.distanceToSquared(l.centroid,r);d<i&&(o=h,i=d)}return o}),a.prototype.clampStep=function(){var e,t,r=new THREE.Vector3,n=new THREE.Plane,o=new THREE.Triangle,i=new THREE.Vector3,s=new THREE.Vector3;return function(a,h,c,u,l,d){var p=this.zones[u].vertices,f=this.zones[u].groups[l],v=[c],g={};g[c.id]=0,e=void 0,s.set(0,0,0),t=Infinity,n.setFromCoplanarPoints(p[c.vertexIds[0]],p[c.vertexIds[1]],p[c.vertexIds[2]]),n.projectPoint(h,r),i.copy(r);for(var E=v.pop();E;E=v.pop()){o.set(p[E.vertexIds[0]],p[E.vertexIds[1]],p[E.vertexIds[2]]),o.closestPointToPoint(i,r),r.distanceToSquared(i)<t&&(e=E,s.copy(r),t=r.distanceToSquared(i));var y=g[E];if(!(y>2))for(var x=0;x<E.neighbours.length;x++){var T=f[E.neighbours[x]];T.id in g||(v.push(T),g[T.id]=y+1)}}return d.copy(s),e}}();var h={PLAYER:new THREE.Color(15631215).convertGammaToLinear(2.2).getHex(),TARGET:new THREE.Color(14469912).convertGammaToLinear(2.2).getHex(),PATH:new THREE.Color(41903).convertGammaToLinear(2.2).getHex(),WAYPOINT:new THREE.Color(41903).convertGammaToLinear(2.2).getHex(),CLAMPED_STEP:new THREE.Color(14472114).convertGammaToLinear(2.2).getHex(),CLOSEST_NODE:new THREE.Color(4417387).convertGammaToLinear(2.2).getHex()},c=function(e){function t(){var t=this;e.call(this),this._playerMarker=new THREE.Mesh(new THREE.SphereGeometry(.25,32,32),new THREE.MeshBasicMaterial({color:h.PLAYER})),this._targetMarker=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),new THREE.MeshBasicMaterial({color:h.TARGET})),this._nodeMarker=new THREE.Mesh(new THREE.BoxGeometry(.1,.8,.1),new THREE.MeshBasicMaterial({color:h.CLOSEST_NODE})),this._stepMarker=new THREE.Mesh(new THREE.BoxGeometry(.1,1,.1),new THREE.MeshBasicMaterial({color:h.CLAMPED_STEP})),this._pathMarker=new THREE.Object3D,this._pathLineMaterial=new THREE.LineBasicMaterial({color:h.PATH,linewidth:2}),this._pathPointMaterial=new THREE.MeshBasicMaterial({color:h.WAYPOINT}),this._pathPointGeometry=new THREE.SphereBufferGeometry(.08),this._markers=[this._playerMarker,this._targetMarker,this._nodeMarker,this._stepMarker,this._pathMarker],this._markers.forEach(function(e){e.visible=!1,t.add(e)})}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.setPath=function(e){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);e=[this._playerMarker.position].concat(e);for(var t=new THREE.Geometry,r=0;r<e.length;r++)t.vertices.push(e[r].clone().add(new THREE.Vector3(0,.2,0)));this._pathMarker.add(new THREE.Line(t,this._pathLineMaterial));for(var n=0;n<e.length-1;n++){var o=new THREE.Mesh(this._pathPointGeometry,this._pathPointMaterial);o.position.copy(e[n]),o.position.y+=.2,this._pathMarker.add(o)}return this._pathMarker.visible=!0,this},t.prototype.setPlayerPosition=function(e){return this._playerMarker.position.copy(e),this._playerMarker.visible=!0,this},t.prototype.setTargetPosition=function(e){return this._targetMarker.position.copy(e),this._targetMarker.visible=!0,this},t.prototype.setNodePosition=function(e){return this._nodeMarker.position.copy(e),this._nodeMarker.visible=!0,this},t.prototype.setStepPosition=function(e){return this._stepMarker.position.copy(e),this._stepMarker.visible=!0,this},t.prototype.reset=function(){for(;this._pathMarker.children.length;)this._pathMarker.children[0].visible=!1,this._pathMarker.remove(this._pathMarker.children[0]);return this._markers.forEach(function(e){e.visible=!1}),this},t}(THREE.Object3D);export{a as Pathfinding,c as PathfindingHelper};
//# sourceMappingURL=three-pathfinding.module.js.map
