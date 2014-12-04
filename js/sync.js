window.dao = {

	
	
	initialize : function(callback) {
		var self = this;
		this.db = window.openDatabase("IBabyLife", "1.0", "IBabyLife adatbázis", 200000);

		this.db.transaction(function(tx) {
			tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='albums' ", this.txErrorHandler, function(tx, results) {
				if (results.rows.length == 1) {
					
					console.log('Már van albums tábla az SQLlite adatbázisban');
				} else {
					
					console.log('Még nincs albums tábla SQLlite adatbázisban ezért csinálunk 1-t');
					self.createAlbumsTable();
					
				}
			});
			tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='events' ", this.txErrorHandler, function(tx, results) {
				if (results.rows.length == 1) {
					
					console.log('Már van events tábla az SQLlite adatbázisban');
				} else {
					
					console.log('Még nincs events tábla SQLlite adatbázisban ezért csinálunk 1-t');
					self.createEventsTable();
					
				}
			});
		});
	},
	
	createEventsTable : function() {
		this.db.transaction(function(tx) {
			var sql = "CREATE TABLE IF NOT EXISTS events ( id INTEGER PRIMARY KEY AUTOINCREMENT,feltoltve int DEFAULT 0, albumId int, eventMessage VARCHAR(50), eventMilestone VARCHAR(50),eventImg1 char, eventImg2 char,eventImg3 char,eventImg4 char,eventImg5 char,eventImg6 char,eventImg7 char,eventImg8 char,eventImg9 char,eventImg10 char, eventDate datetime)";
			tx.executeSql(sql);
		}, this.txErrorHandler, function() {
			console.log('EVents tábla sikeresen elkészitve !!');

		});
	},
	
	createAlbumsTable : function() {
		this.db.transaction(function(tx) {
			var sql = "CREATE TABLE IF NOT EXISTS albums ( id INTEGER PRIMARY KEY AUTOINCREMENT, albumOwner VARCHAR(50), albumName VARCHAR(50),albumDate datetime ,albumSex varchar(10))";
			tx.executeSql(sql);
		}, this.txErrorHandler, function() {
			console.log('Albums tábla sikeresen elkészitve !!');

		});
	},
	
	getOfflineEvent : function(callback){
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM events where feltoltve = 0  order by eventDate desc ";
			console.log('SQLlite lekérdezés : offline események');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, events = [], i = 0;
				for (; i < len; i = i + 1) {
					events[i] = results.rows.item(i);

				}
				console.log(len + 'offline esemény találat');
				callback(events);
			});
		});	
	},
	
	getAllEvent : function(callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM events  order by eventDate desc ";
			console.log('SQLlite lekérdezés : "SELECT * FROM events "');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, events = [], i = 0;
				for (; i < len; i = i + 1) {
					events[i] = results.rows.item(i);

				}
				console.log(len + ' esemény találat');
				callback(events);
			});
		});
	},
	
	getAllEventById : function(albumid,callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM events where albumID="+albumid+" order by eventDate desc ";
			console.log('SQLlite lekérdezés : "SELECT * FROM events where albumid "');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, events = [], i = 0;
				for (; i < len; i = i + 1) {
					events[i] = results.rows.item(i);

				}
				console.log(len + ' esemény találat');
				callback(events);
			});
		});
	},
	
	eventById : function(eventID, callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM events where id = " + eventID;

			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var len = results.rows.length, event = [], i = 0;
				for (; i < len; i = i + 1) {
					event[i] = results.rows.item(i);
				}
				callback(event);	
			});
		}, this.txErrorHandler, function(tx) {
			
		});
	},
	eventFeltolt : function(eventID) {
		this.db.transaction(function(tx) {
			var sql = "UPDATE events SET feltoltve=1 WHERE id = " + eventID;
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var len = results.rows.length, event = [], i = 0;
				for (; i < len; i = i + 1) {
					event[i] = results.rows.item(i);
				}					
			});
		}, this.txErrorHandler, function(tx) {
			
		});
	},


	
	newEVent : function(event,callback) {

		this.db.transaction(function(tx) {

			var sql = "INSERT OR REPLACE INTO events (albumId,eventMessage,eventMilestone,eventImg1,eventImg2,eventImg3,eventImg4,eventImg5,eventImg6,eventImg7,eventImg8,eventImg9,eventImg10,eventDate) " + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			var e = event;
			var params = [e.albumid,e.eventMessage,e.eventMilestone,e.eventImg1,e.eventImg2,e.eventImg3,e.eventImg4,e.eventImg5,e.eventImg6,e.eventImg7,e.eventImg8,e.eventImg9,e.eventImg10,e.eventDate];
			tx.executeSql(sql, params);

		}, this.txErrorHandler, function(tx) {			
			callback();
		});
	},
	

	newAlbum : function(album,callback) {

		this.db.transaction(function(tx) {

			var sql = "INSERT OR REPLACE INTO albums (albumOwner,albumName,albumDate,albumSex) " + "VALUES (?,?,?,?)";
			var e = album;
			var params = [e.albumOwner,e.albumName,e.albumDate,e.albumSex];
			tx.executeSql(sql, params);

		}, this.txErrorHandler, function(tx) {			
			callback();
		});
	},
	findAlbumByOwnerAndName : function(albumowner,albumname,callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM albums WHERE albumOwner = '"+albumowner+"' AND albumName = '"+albumname+"' ";
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, albums = [], i = 0;
				for (; i < len; i = i + 1) {					
					albums[i] = results.rows.item(i);
				}
				callback(albums);
			});
		});
	},
	
	findAlbumByID : function(albumid,callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM albums where id="+albumid+"";
			console.log('SQLlite lekérdezés : "SELECT * FROM albums where albumid "');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, albums = [], i = 0;
				for (; i < len; i = i + 1) {					
					albums[i] = results.rows.item(i);
				}
				console.log(len + ' album találat');
				callback(albums);
			});
		});
	},
	findAllAlbum : function(callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT  * FROM albums";
			console.log('SQLlite lekérdezés : "SELECT * FROM albums "');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, albums = [], i = 0;
				for (; i < len; i = i + 1) {					
					albums[i] = results.rows.item(i);
				}
				console.log(len + ' album találat');
				callback(albums);
			});
		});
	},
	
	dropTables : function(callback) {
		this.db.transaction(function(tx) {
			tx.executeSql('DROP TABLE IF EXISTS albums');
			tx.executeSql('DROP TABLE IF EXISTS events');
		}, this.txErrorHandler, function() {
			console.log('az összes tábla törölve');
			callback();
		});
	},

	txErrorHandler : function(tx) {
		alert(tx.message);
	},
	
	/*
	ingatlanById : function(ingatlanID, callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM ingatlanok where id = " + ingatlanID;

			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var len = results.rows.length, ingatlan = [], i = 0;
				for (; i < len; i = i + 1) {
					ingatlan[i] = results.rows.item(i);
				}
				callback(ingatlan);
			});
		});

	},

	ingatlanokByUserID : function(userID, callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM ingatlanok where idTulaj = " + userID + " order by feltoltve desc";

			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var len = results.rows.length, ingatlan = [], i = 0;
				for (; i < len; i = i + 1) {
					ingatlan[i] = results.rows.item(i);
				}
				callback(ingatlan);
			});
		});

	},

	createTable : function() {
		this.db.transaction(function(tx) {
			var sql = "CREATE TABLE IF NOT EXISTS ingatlanok ( " + "id INTEGER PRIMARY KEY AUTOINCREMENT," + " idTulaj int," + " kep VARCHAR(50)," + " megnevezes VARCHAR(50)," + "fekves VARCHAR(50), " + "tipus VARCHAR(50), " + "alapterulet int, " + "telekterulet int, " + "komfortfok VARCHAR(50), " + "viz int," + "gaz int," + "villany int," + "kozpontifutes int," + "pince int," + "csatorna int," + "garazs	int," + "kabeltv int," + "cim text," + "ar	int," + "feltoltve	VARCHAR(50)," + "aktiv	int )";
			tx.executeSql(sql);
		}, this.txErrorHandler, function() {
			log('Ingatlanok tábla sikeresen elkészitve !!');

		});
	},
	createTableForSaveIng : function() {
		this.db.transaction(function(tx) {
			var sql = "CREATE TABLE IF NOT EXISTS myIngs ( " + "id INTEGER PRIMARY KEY AUTOINCREMENT," + " idTulaj int," + " kep VARCHAR(50)," + " megnevezes VARCHAR(50)," + "fekves VARCHAR(50), " + "tipus VARCHAR(50), " + "alapterulet int, " + "telekterulet int, " + "komfortfok VARCHAR(50), " + "viz int," + "gaz int," + "villany int," + "kozpontifutes int," + "pince int," + "csatorna int," + "garazs	int," + "kabeltv int," + "cim text," + "ar	int," + "aktiv	int )";
			tx.executeSql(sql);
		}, this.txErrorHandler, function() {
			log('Ingatlanok tábla sikeresen elkészitve !!');
		});
	},

	dropTable : function(callback) {
		this.db.transaction(function(tx) {
			tx.executeSql('DROP TABLE IF EXISTS ingatlanok');
			tx.executeSql('DROP TABLE IF EXISTS myIngs');
		}, this.txErrorHandler, function() {
			log('Ingatlanok táblát töröltük SQLlite adatbázisóból');
			callback();
		});
	},

	hirdeteseim : function(callback) {
		this.db.transaction(function(tx) {

			var sql = "SELECT  * FROM myIngs";
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, ingatlanok = [], i = 0;
				for (; i < len; i = i + 1) {
					ingatlanok[i] = results.rows.item(i);

				}

				callback(ingatlanok);
			});
		});
	},

	findAll : function(callback) {
		this.db.transaction(function(tx) {
			dao.olddbRow = 0;
			var sql = "SELECT  * FROM ingatlanok  order by feltoltve desc ";
			log('SQLlite lekérdezés : "SELECT * FROM ingatlanok "');
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				var len = results.rows.length, ingatlanok = [], i = 0;
				for (; i < len; i = i + 1) {
					dao.olddbRow++;
					ingatlanok[i] = results.rows.item(i);

				}
				log(len + ' ingatlan találat');
				console.log(dao.olddbRow);
				callback(ingatlanok);
			});
		});
	},

	getLastSync : function(callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT MAX(feltoltve) as lastSync FROM ingatlanok";
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var lastSync = results.rows.item(0).lastSync;
				log('Utolsó SQLlite feltöltés ' + lastSync);
				callback(lastSync);
			});
		});
	},

	sync : function(callback) {

		var self = this;
		log('Szinkronizálás kezdése...');
		this.getLastSync(function(lastSync) {
			self.getChanges(self.syncURL, lastSync, function(changes) {
				if (changes.length > 0) {
					self.applyChanges(changes, callback);
				} else {
					alert('Nincs újabb ingatlan');

				}
			});
		});

	},

	getChanges : function(syncURL, modifiedSince, callback) {

		$.ajax({
			url : serverURL + "onlab1server/adatok.php",
			data : {
				modifiedSince : modifiedSince
			},
			dataType : "json",
			success : function(data) {
				console.log("A szerver visszaküldött " + data.length + " ingatlant, ami  " + modifiedSince + " után lett feltöltve");
				callback(data);
			},
			error : function(model, response) {
				alert(response.responseText);
			}
		});

	},

	insertIntoMyIngs : function(ingatlan,callback) {

		this.db.transaction(function(tx) {

			var sql = "INSERT OR REPLACE INTO myIngs (idTulaj,kep,megnevezes, fekves, tipus, alapterulet, telekterulet, komfortfok, viz,gaz ,villany,kozpontifutes,pince,csatorna,garazs,kabeltv,cim,ar,aktiv) " + "VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			var e = ingatlan;
			var params = [e.idTulaj, e.kep, e.megnevezes, e.telepules, e.tipus, e.alapterulet, e.telekterulet, e.komfortfok, e.viz, e.gaz, e.villany, e.kozpontifutes, e.pince, e.csatorna, e.garazs, e.kabeltv, e.cim, e.ar, e.aktiv];
			tx.executeSql(sql, params);

		}, this.txErrorHandler, function(tx) {
			alert('Az ingatlant elmentettük');
			callback();
		});
	},

	updateMyIng : function(id) {
		this.db.transaction(function(tx) {

			var sql = "UPDATE myIngs set aktiv=1 where id="+id;
			tx.executeSql(sql);

		}, this.txErrorHandler, function(tx) {
			alert('Az ingatlan feltöltve');
		});

	},

	getMyIngById : function(id, callback) {
		this.db.transaction(function(tx) {
			var sql = "SELECT * FROM myIngs where id = " + id;

			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {
				var len = results.rows.length, ingatlan = [], i = 0;
				for (; i < len; i = i + 1) {
					ingatlan[i] = results.rows.item(i);
				}
				callback(ingatlan);
			});
		});

	},

	applyChanges : function(ingatlanok, callback) {
		this.db.transaction(function(tx) {
			var l = ingatlanok.length;

			var sql = "INSERT OR REPLACE INTO ingatlanok (id,idTulaj,kep,megnevezes, fekves, tipus, alapterulet, telekterulet, komfortfok, viz,gaz ,villany,kozpontifutes,pince,csatorna,garazs,kabeltv,cim,ar,feltoltve,aktiv) " + "VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			log('Beszúrás a locális adatbázisba:');
			var e;
			for (var i = 0; i < l; i++) {
				dao.olddbRow++;
				e = ingatlanok[i];
				downloadImage(serverURL + 'onlab1server/kepfeltoltes.php?image=' + e.kep, e.kep);
				var params = [e.id, e.idTulaj, e.kep, e.megnevezes, e.fekves, e.tipus, e.alapterulet, e.telekterulet, e.komfortfok, e.viz, e.gaz, e.villany, e.kozpontifutes, e.pince, e.csatorna, e.garazs, e.kabeltv, e.cim, e.ar, e.feltoltve, e.aktiv];
				tx.executeSql(sql, params);

			}
			log('Szinkronizálás kész (' + l + ' elem szinkronizálva)');

			if (dao.olddbRow > 10) {
				dao.sqlSortorles(dao.olddbRow - 10);
			}

		}, this.txErrorHandler, function(tx) {
			callback();
		});
	},
	
	sqlSortorles : function(l) {
		this.db.transaction(function(tx) {

			var sql = "DELETE FROM `ingatlanok` WHERE id IN (select id  FROM `ingatlanok`  ORDER BY `feltoltve`  LIMIT " + l + ")";
			tx.executeSql(sql, this.txErrorHandler, function(tx, results) {

				console.log(l + ' régi ingatlan törlése az offline adatbázisból:');

			});
		}, this.txErrorHandler, function(tx) {

		});
	}
	*/
};

dao.initialize(function() {
	console.log('helyi adatbázis betöltve');
});


