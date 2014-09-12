var hosts = {};
/*
,
    '' : {
        url:'',
        ua:'',
        steps:[function(){return }],
        title:""
    },


*/
var bugdata = {
    '1044422' : {
        url:'https://www.yahoo.com',
        ua:'FirefoxAndroid',
        steps:[function(){
            var tmp = document.body.appendChild(document.createElement('div'));
            // #Stencil .fx-slidein
            tmp.id = 'Stencil';
            tmp = tmp.appendChild(document.createElement('div'));
            tmp.className = 'fx-slidein';
            return getComputedStyle(tmp,'').position !== 'fixed';
        }],
        title:"Can't scroll articles on yahoo.com"
    },
    "1014905": {
        "url": "http://www.t-online.de/eltern/baby/id_69512620/vornamen-kind-darf-schaklin-heissen.html",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.t-online.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Endless redirects on t-online.de"
    },
    "1019665": {
        "url": "http://sixt.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sixt.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sixt.de sends desktop site to Firefox OS"
    },
    "1019663": {
        "url": "http://edarling.mx",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.edarling.mx";}
        ],
        "ua": "FirefoxOS",
        "title": "edarling.mx sends desktop site to Firefox OS"
    },
    "1012483": {
        "url": "http://nike.com/",
        "steps": [
            function(){return location.hostname === "m.nike.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "nike.com doesn't serve the mobile content to Firefox OS"
    },
    "1003466": {
        "url": "http://www.sismologia.cl",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sismologia.cl sends desktop site to Firefox OS"
    },
    "1036240": {
        "url": "http://www.airfrance.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.airfrance.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "airfrance.fr sends desktop content to Firefox OS"
    },
    "875098": {
        "url": "http://www.globeandmail.ca/",
        "steps": [
            function(){return location.hostname === "m.theglobeandmail.com";}
        ],
        "ua": "FirefoxOS",
        "title": "www.globeandmail.ca is displayed poorly in Browser"
    },
    "1013777": {
        "url": "http://sina.cn",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sina.cn sends Firefox OS to the simplified mobile site"
    },
    "1019644": {
        "url": "http://voegol.com.br",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.voegol.com.br" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "voegol.com.br sends desktop site to Firefox OS"
    },
    "1019645": {
        "url": "http://zap.com.br",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.zapimoveis.com.br" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "zap.com.br sends desktop site to Firefox OS"
    },
    "1019189": {
        "url": "http://expedia.com",
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "expedia.com sends desktop site to Firefox OS"
    },
    'webcompat-173' : {
        url:'https://www.chase.com',
        ua:'Opera21',
        steps:[function(){
            if(document.readyState != 'complete') return 'delay-and-retry';
            return document.getElementById('unsecureBrowserMessage') === null || document.getElementById('unsecureBrowserMessage').style.display != 'block'
        }],
        title:"www.chase.com - Opera not a recommended browser"
    },
    "1019225": {
        "url": "http://cinemark.com.br",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "cinemark.com.br sends desktop site to Firefox OS"
    },
    "1026857": {
        "url": "http://www.moleskine.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "moleskine.com sends desktop content to Firefox OS"
    },
    "1019204": {
        "url": "http://match.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname.indexOf("touch.") >-1 && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "match.com sends simplified site to Firefox OS"
    },
    "995811": {
        "url": "http://www.bajacalifornia.gob.mx/portal/index.jsp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ebajacalifornia.gob.mx" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bajacalifornia.gob.mx sends desktop site to Firefox OS"
    },
    "1020733": {
        "url": "http://www.nhknews.jp/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "sp.nhknews.jp";}
        ],
        "ua": "FirefoxOS",
        "title": "www.nhknews.jp is sending the desktop content to Firefox OS"
    },
    "1015673": {
        "url": "http://www.discovery.com",
        "steps": [
            function(){return location.hostname === "m.discovery.com";}
        ],
        "ua": "FirefoxOS",
        "title": "discovery.com sends desktop site to Firefox OS, vides do not play"
    },
    "1019658": {
        "url": "http://hotelescity.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "movil.hotelescity.com";}
        ],
        "ua": "FirefoxOS",
        "title": "hotelescity.com sends desktop site to Firefox OS"
    },
    "1019212": {
        "url": "http://priceline.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "priceline.com sends desktop site to Firefox OS"
    },
    "1013525": {
        "url": "http://vanityfair.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Vanityfair.com sends desktop site to Firefox OS"
    },
    "1023970": {
        "url": "http://www.avea.com.tr/web/",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "www.avea.com.tr sends a wap mime type to Firefox for Android"
    },
    "1036772": {
        "url": "http://store.nba.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "store.nba.com sends desktop site to Firefox on smartphones"
    },
    "1019380": {
        "url": "http://www.hotels.com/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('/mobile') === 0}
        ],
        "title": "hotels.com sends Desktop Content to Firefox OS and Firefox Android"
    },
    "1025589": {
        "url": "http://linkedin.com/in/johnlilley",
        "steps": [
            /* JS redirect needs time to run.. */
            function(){
                if(location.search.indexOf('sessionid') === -1 && location.pathname.indexOf('/404') === -1)return 'delay-and-retry';
            },
            function(){
                if(location.hostname === "touch.www.linkedin.com" && location.pathname.indexOf('/404') === 0)return false;
                if(document.readyState !== 'complete')return 'delay-and-retry';
                if(document.getElementById('profile') && document.getElementById('profile').getElementsByTagName('*').length) return true;

            }
        ],
        "ua": "FirefoxAndroid",
        "title": "LinkedIn pages are 404'ing in Firefox for Android after LinkedIn does a redirect"
    },
    "1019644": {
        "url": "http://voegol.com.br",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.voegol.com.br";}
        ],
        "ua": "FirefoxOS",
        "title": "voegol.com.br sends desktop site to Firefox OS"
    },
    "1036806": {
        "url": "http://www.clarin.com/",
        "steps": [
            function(){return hasViewportMeta() && (location.hostname === "ios.clarin.com" || location.hostname === "android.clarin.com");}
        ],
        "ua": "FirefoxOS",
        "title": "clarin.com serves desktop content to Firefox OS smartphones"
    },
    "1019665": {
        "url": "http://sixt.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sixt.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sixt.de sends desktop site to Firefox OS"
    },
    "975439": {
        "url": "http://www.techeye.net/",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "techeye.net serves WAP content to Firefox for Android"
    },
    '1035141' : {
        url:'http://smart.mail.163.com',
        ua:'FirefoxOS',
        steps:[function(){}, function(){if(document.readyState !== 'complete')return 'delay-and-retry'; return location.hostname === 'smart.mail.163.com'}],
        title:"smart.mail.163.com redirects Firefox OS to desktop login page"
    },
    '976013' : {
        url:'http://people.mozilla.org/~atrain/mobile/tests/google-translate.html',
        ua:'FirefoxAndroid',
        steps:[function(){try{return document.getElementsByClassName('goog-te-menu-frame')[0].contentDocument.getElementsByClassName('goog-te-menu2-item').length>1}catch(e){return false;}}],
        title:""
    },
    '989584' : {
        url:'https://www.delta.com/PCCOciWeb/DisplayTripSummaryNext.action',
        ua:'FirefoxDesktop',
        steps:[function(){
            var ver;
            for(var el,i=0;el=document.scripts[i];i++){
                if(el.src.indexOf('?ver=')>-1)ver = el.src.substring(el.src.indexOf('?ver=')+5, el.src.length);
            }
            location = 'https://content.delta.com/content/dam/delta-applications/pcc/oci_'+ver.substr(0,6)+'/1/shared/jawr/js/ocibundle.js?ver='+ver;

        },
        function(){
            return document.body.textContent.indexOf('\nvar opener={open:') === -1;
        }
        ],
        title:""
    },

    '945483' : {
        url:'http://www.nhl.com/ice/m_news.htm?id=719137',
        ua:'FirefoxAndroid',
        steps:[function(){ if(!document.querySelector('video,object'))return 'delay-and-retry'; return hasVideoTags(); }],
        title:'HTML video playback for NeuLion video player [NFL, NHL, NBA, MLS, UFCtv, Premier League, etc.]'
    },
    "976749": {
        "url": "https://www.google.me/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementsByClassName('signin-link').length>0}
        ],
        "title": "Missing connect button in main google page in certain locales"
    },
    "952778": {
        "url": "http://app.nytimes.com/",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){return document.body.textContent.indexOf('Your browser is not supported')===-1 && document.body.textContent.indexOf('not yet support smartphone')===-1 }
        ],
        "title": "app.nytimes.com does not support Firefox for Android"
    },
    "1008511": {
        "url": "http://freemail.hu",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(location.pathname === '/')return 'delay-and-retry';  return location.href.indexOf('szimpla/') != -1}
        ],
        "title": "freemail.hu sends desktop site to Firefox OS and Firefox on Android"
    },
    "972268": {
        "url": "http://news.youku.com/qihou2012/index",
        "ua": "FirefoxOS",
        "steps": [
            /* guesswork based on info in bug report */
            function(){return Youku._IsHtml5 != false}
        ],
        "title": "[Sora][Browser]Interface display abnormally,Pictures and characters on the screen do not overlap"
    },
    "981390": {
        "url": "http://web.ad2games.com/applift/friv/v2/redirect.html",
        "ua": "FirefoxOS",
        "steps": [
            /* JS sniffing on page should take us somewhere else.. */
            function(){},
            function(){return location.href !== 'http://web.ad2games.com/applift/friv/v2/redirect.html' }
        ],
        "title": "friv.com has broken layout in Firefox OS"
    },
    "1005122": {
        "url": "http://larojadeportes.cl",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('menu-menu-principal')!=null}
        ],
        "title": "larojadeportes.cl sends desktop site to Firefox OS"
    },
    "1001459": {
        "url": "http://thedailyshow.cc.com/",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){
                if(document.getElementsByClassName('module_content').length === 0) return 'delay-and-retry';
                return !/^\s+$/.test(document.getElementById('tier_1').textContent);
            }
        ],
        "title": "Comedy Central \"The Daily Show\" web site has no content when loaded in Firefox for Android (or with Firefox for Android user agent string)"
    },
    "1005131": {
        "url": "http://trabajando.cl",
        "ua": "FirefoxOS",
        "steps": [
           function(){return location.hostname === 'm.trabajando.cl'}
        ],
        "title": "trabajando.cl sends desktop site to Firefox OS"
    },
    "953213": {
        "url": "http://www.mobilefringeserver.com/mw/southcentre/index.html",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){var pass=true; try{var myPhotoSwipe = $("#Gallery a").photoSwipe({  });}catch(e){pass=false} return pass && document.getElementsByClassName('ui-btn-text').length>1}
        ],
        "title": "Southcentre Mall website doesn't work in Firefox"
    },
    "953240": {
        "url": "http://sports.yahoo.com/blogs/nhl-puck-daddy/top-10-hockey-fights-2013-puck-daddy-review-205905009--nhl.html",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(document.getElementById('yog-page') === null) return 'delay-and-retry'; return getComputedStyle(document.getElementById('yog-page')).display != '-moz-box' }
        ],
        "title": "Text cut off on mobile Yahoo, with a wide iframe being ineffectively clamped by \"max-width: 100%\", several layers deep inside of a -moz-box"
    },
    "992851": {
        "url": "http://www.google.com/flights",
        "ua": "FirefoxOS",
        "steps": [
            /* simplest way to look for the problem: find the right script (external, contains 'cache' - hi GWT),
                load that script, look for the problematic parts
             */
            function(){for(var el,i=0; el=document.scripts[i]; i++){if(el.src.indexOf('cache')>-1){location=el.src;break;}}},
            /* omitting function name - will change - but if there are false positives moving to a regexp could fix that.. */
            function(){return ! (document.body.textContent.indexOf('(a){return a.scrollTop||0}') > -1 && document.body.textContent.indexOf('($doc.body)|0)+') > -1)}
        ],
        "title": "Google flight search: book button does not work"
    },
    "1002322": {
        "url": "http://www.musicradar.com",
        "steps": [
            function(){return location.hostname === "m.musicradar.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Musicradar.com sends desktop site to Firefox OS"
    },
    "1008883": {
        "url": "http://mastercard.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mastercard.com";}
        ],
        "ua": "FirefoxOS",
        "title": "mastercard.com sends desktop site to Firefox OS"
    },
    "1005128": {
        "url": "http://www.portalinmobiliario.com",
        "steps": [
            function(){return location.hostname === "m.portalinmobiliario.com";}
        ],
        "ua": "FirefoxOS",
        "title": "portalinmobiliario.com sends desktop site to Firefox OS and Firefox on Android"
    },
    "1002592": {
        "url": "http://www.classicsmonthly.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.classicsmonthly.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Classicsmonthly.com sends desktop site to Firefox OS"
    },
    "1002525": {
        "url": "http://www.bikeradar.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bikeradar.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Bikeradar.com sends desktop site to Firefox OS"
    },
    "1002666": {
        "url": "http://www.fastbikesmag.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.fastbikesmag.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Fastbikesmag.com sends desktop site to Firefox OS"
    },
    "1004416": {
        "url": "http://internetactu.blog.lemonde.fr/2014/02/14/de-quoi-les-google-bus-sont-ils-le-symptome/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "*.blog.lemonde.fr sends the desktop content to Firefox OS"
    },
    "1005286": {
        "url": "http://eldefinido.cl",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "eldefinido.cl sends desktop site to Firefox OS and Firefox for Android"
    },
    "1002583": {
        "url": "http://www.classicfordmag.co.uk/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.classicfordmag.co.uk" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Classicfordmag.co.uk sends desktop site to Firefox OS"
    },
    "1008885": {
        "url": "http://www.scotiabank.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "scotiabank.com sends desktop site to Firefox OS"
    },
    "1002661": {
        "url": "http://www.edge-online.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.edge-online.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Edge-online.com sends desktop site to Firefox OS"
    },
    "1002657": {
        "url": "http://www.cyclingnews.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.cyclingnews.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Cyclingnews.com sends desktop site to Firefox OS"
    },
    "1002511": {
        "url": "http://www.techradar.com",
        "steps": [
            function(){return location.hostname === "m.techradar.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Techradar.com sends desktop site to Firefox OS"
    },
    "1002321": {
        "url": "http://www.epagine.fr/",
        "steps": [
            function(){return location.hostname === 'm.epagine.fr';}
        ],
        "ua": "FirefoxOS",
        "title": "epagine.fr sends desktop content to Firefox OS"
    },
    "1005135": {
        "url": "http://soychile.cl",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "soychile.cl sends desktop site to Firefox OS"
    },
    "1002623": {
        "url": "http://www.sfx.co.uk",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sfx.co.uk" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Sfx.co.uk sends desktop site to Firefox OS"
    },
    "1005288": {
        "url": "http://despegar.cl",
        "steps": [
            function(){return location.hostname === "m.despegar.cl" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "despegar.cl sends desktop site to Firefox OS"
    },
    "865043": {
        "url": "http://news.google.com/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "A better news.google.com for Firefox OS"
    },
    "984126": {
        "url": "http://boston.menupages.com/restaurants/mike-and-pattys/menu",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Text cut off on menupages.com"
    },
    "964694": {
        "url": "http://bing.com",
        "steps": [
            function(){
                if(document.getElementById('bgDiv').style.backgroundImage === '') return 'delay-and-retry';
                return document.getElementById('bgDiv').style.backgroundImage.indexOf('Resolution')===-1;
            }
        ],
        "ua": "FirefoxAndroidTablet",
        "title": "[Tablet] - Bing.com background is not properly resized for tablets"
    },
    "1003684": {
        "url": "http://www.jp-bank.japanpost.jp/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.querySelector('a[href*="/sp/sp_index"]') ? true : false;}
        ],
        "title": "jp-bank.japanpost.jp triggers a banner for certain mobile devices only"
    },
    "966868": {
        "url": "http://www.nick.com/videos/",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){return document.querySelector('a.episode').click()},
            function(){if(!document.getElementById('video-player'))return 'delay-and-retry'; return hasVideoTags();}
        ],
        "title": "nick.com doesn't play videos in Firefox OS or Firefox on Android"
    },
    "1007945": {
        "url": "http://mt.bp3.ford.com/#appsimHome",
        "ua": "FirefoxOS",
        "steps": [
           function(){
            var div, bg;
            (div=document.body.appendChild(document.createElement('div'))).innerHTML='<ul class="summary-actions"><li class="focus"><span></span></li></ul>';
            bg = getComputedStyle(div.getElementsByTagName('span')[0], '').background;
            return background.indexOf('gradient')>-1
           }
        ],
        "title": "Ford.com buttons don't display properly in Firefox Android due to webkit CSS"
    },
    "1003809": {
        "url": "http://falabella.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.falabella.com";}
        ],
        "ua": "FirefoxOS",
        "title": "falabella.com zoom or text size is different on Firefox OS"
    },
    "1003838": {
        "url": "http://movistar.cl",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "movistar.cl sends desktop site to Firefox OS"
    },
    "1003840": {
        "url": "http://elrastro.cl",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.rastro.com";}
        ],
        "ua": "FirefoxOS",
        "title": "elrastro.cl sends desktop site to Firefox OS"
    },
    "1003830": {
        "url": "http://www.chileautos.cl/chileautos.asp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.chileautos.cl";}
        ],
        "ua": "FirefoxOS",
        "title": "chileautos.cl sends desktop site to Firefox OS"
    },
    "1003831": {
        "url": "http://biobiochile.cl",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.biobiochile.cl";}
        ],
        "ua": "FirefoxOS",
        "title": "biobiochile.cl sends desktop site to Firefox OS"
    },
    '979085' : {
        url:'http://www.sii.cl',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname === 'm.sii.cl'}]
    },
    "1001563": {
        "url": "http://online.wsj.com/news/articles/SB10001424052702304788404579522612497528586",
        "steps": [
            function(){
                for(var elms=document.querySelectorAll('meta[name="viewport"]'),el,i=0;el=elms[i];i++){
                    if(/width=device-width/i.test(el.content))return false;
                }
                return true;
            }
        ],
        "ua": "FirefoxAndroid",
        "title": "Double-tap zoom does not work on wsj.com"
    },
    "1008873": {
        "url": "http://depor.pe",
        "steps": [
            function(){return location.hostname === "m.depor.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "depor.pe sends desktop site to Firefox OS, can't play video"
    },
    "1008877": {
        "url": "http://miclaro.com.pe",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "miclaro.com.pe sends simplified site to Firefox OS"
    },
    "1008509": {
        "url": "http://origo.hu",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.origo.hu";}
        ],
        "ua": "FirefoxOS",
        "title": "origo.hu sends desktop site to Firefox OS"
    },
    "1008881": {
        "url": "http://investing.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.investing.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "investing.com sends desktop site to Firefox OS"
    },
    "1008889": {
        "url": "http://state.gov",
        "steps": [
            function(){},
            function(){return hasViewportMeta() && location.hostname === "m.state.gov";}
        ],
        "ua": "FirefoxOS",
        "title": "state.gov sends desktop site to Firefox OS and Firefox on Android"
    },
    "1008886": {
        "url": "http://wellsfargo.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.wellsfargo.com";}
        ],
        "ua": "FirefoxOS",
        "title": "wellsfargo.com sends desktop site to Firefox OS"
    },
    "1008868": {
        "url": "http://sulia.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sulia.com sends desktop site to Firefox OS"
    },
    "1004974": {
        "url": "http://money.rediff.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.money.rediff.com";}
        ],
        "ua": "FirefoxOS",
        "title": "money.rediff.com sends desktop site to Firefox OS"
    },
    "1004975": {
        "url": "http://kotaksecurities.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.kotaksecurities.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "kotaksecurities.com sends desktop site to Firefox OS"
    },
    "1004971": {
        "url": "http://scoop.it",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "scoop.it sends desktop site to Firefox OS"
    },
    "1008864": {
        "url": "http://vizionplus.al",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "vizionplus.al (and vizionplus.tv) sends desktop site to Firefox OS"
    },
    "1005882": {
        "url": "http://infonews.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.infonews.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "infonews.com sends desktop site to Firefox OS"
    },
    "1005476": {
        "url": "http://interia.pl",
        "steps": [
            function(){return location.hostname === "m.interia.pl";}
        ],
        "ua": "FirefoxOS",
        "title": "Interia.pl sends desktop page to Firefox OS"
    },
    "1008510": {
        "url": "http://blog.hu",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "blog.hu sends desktop site to Firefox OS"
    },
    '1003821' : {
        url:'http://santander.cl',
        ua:'FirefoxOS',
        steps:[function(){}, function(){return location.pathname.indexOf('/movil')>-1} ]
    },
    '1003806' : {
        url:'http://www.lun.com/lunmobile//homepage.aspx',
        ua:'FirefoxOS',
        steps:[function(){return document.getElementById('UctNewsPaperArea1_rptNewsPaperArea_ctl01_imgNewsPaper').naturalWidth>200}]
    },
    "995776": {
        "url": "http://www.inegi.org.mx",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname.indexOf('/movil')==0}
        ],
        "title": "inegi.org.mx sends desktop site to Firefox OS"
    },
    "995779": {
        "url": "http://www.scjn.gob.mx",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname.indexOf('/Mobile')==0; }
        ],
        "title": "scjn.gob.mx sends desktop site to Firefox OS"
    },
    "995778": {
        "url": "http://www.diputados.gob.mx",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.querySelector('a[href*="movil.diputados.gob.mx"]') != null; }
        ],
        "title": "diputados.gob.mx sends desktop site to Firefox OS"
    },
    "993143": {
        "url": "https://my.yahoo.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.href.indexOf('login.yahoo.com/m')>-1}
        ],
        "title": "my.yahoo.com redirect loop in Firefox for Android"
    },
    "999969": {
        "url": "http://www.zozo.jp/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('/sp/')===0}
        ],
        "title": "zozo.jp doesn't offer mobile content to Firefox OS"
    },
    "999495": {
        "url": "http://priceonomics.com/how-americans-hate-each-other/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.querySelector('meta[content*="user-scalable=0"]')==null;}
        ],
        "title": "Priceonomics.com - Unable to zoom in/out on Firefox Android"
    },
    "915853": {
        "url": "http://matthewhudson.me/projects/device.js/",
        "ua": "FirefoxOSZTE",
        "steps": [
            /* the demo page has convenient detection methods :) */
            function(){return device.fxosPhone(); }
        ],
        "title": "device.js recognizes B2G UA as desktop browser"
    },
    "989673": {
        "url": "http://www.onpe.gob.pe/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname === 'm.onpe.gob.pe' }
        ],
        "title": "onpe.gob.pe sends desktop site to Firefox OS"
    },
    "993864": {
        "url": "http://idbi.com",
        "ua": "FirefoxOS",
        "steps": [
            /* Desktop site currently has 17 tables */
            function(){return document.getElementsByTagName('table').length < 7; }
        ],
        "title": "idbi.com sends desktop site to Firefox OS"
    },
    "984933": {
        "url": "http://play.google.com",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){ if(document.documentElement.scrollTop === 0){ scrollBy(0, 4000); return 'delay-and-retry';} return document.getElementsByClassName('sticky').length === 0 }
        ],
        "title": "Google Play - Navigation overlay obstructing most of the app-pages"
    },
    "985276": {
        "url": "http://m.taobao.com",
        "steps": [
            function(){return location.hostname === "m.taobao.com" && document.getElementById('first-view')!=null && document.getElementsByClassName('sliderwrap')[0].style.transform!='';}
        ],
        "ua": "FirefoxOS",
        "title": "taobao.com fancy mobile site has broken layout in Firefox OS"
    },
    "975378": {
        "url": "http://cleartrip.com/",
        "steps": [
            function(){return document.getElementById('fea').style.display!='none';}
        ],
        "ua": "FirefoxOS",
        "title": "cleartrip.com serves simplified site with only Indian airports to Firefox on Android"
    },
    "993870": {
        "url": "http://bankbazaar.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bankbazaar.com sends desktop site to Firefox OS"
    },
    "1000005": {
        "url": "http://hir24.hu",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.hir24.hu" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "hir24.hu sends desktop site to Firefox OS"
    },
    "969859": {
        "url": "http://jappy.de/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.jappy.de";}
        ],
        "ua": "FirefoxOS",
        "title": "jappy.de sends desktop site to Firefox OS"
    },
    "993869": {
        "url": "http://policybazaar.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.policybazaar.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "policybazaar.com sends desktop site to Firefox OS"
    },
    "993867": {
        "url": "http://iciciprulife.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.iciciprulife.com";}
        ],
        "ua": "FirefoxOS",
        "title": "iciciprulife.com sends desktop site to Firefox OS"
    },
    "993866": {
        "url": "http://financialexpress.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.financialexpress.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "financialexpress.com sends desktop site to Firefox OS"
    },
    "993863": {
        "url": "http://nseindia.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.nseindia.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "nseindia.com sends desktop site to Firefox OS"
    },
    "993862": {
        "url": "http://paytm.in",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "paytm.in sends simplified site to Firefox OS"
    },
    "993861": {
        "url": "http://money.rediff.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.money.rediff.com";}
        ],
        "ua": "FirefoxOS",
        "title": "money.rediff.com sends desktop site to Firefox OS"
    },
    "995812": {
        "url": "http://cndh.org.mx",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "cndh.org.mx sends desktop site to Firefox OS"
    },
    "995761": {
        "url": "http://elsiglodetorreon.com.mx",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "elsiglodetorreon.com.mx sends desktop site to Firefox OS"
    },
    "985277": {
        "url": "http://sohu.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sohu.com" && hasMobileOptimizedMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "sohu.com sends desktop site to Firefox OS"
    },
    "995764": {
        "url": "http://axa.com.mx",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "axainforma.com";}
        ],
        "ua": "FirefoxOS",
        "title": "axa.com.mx sends desktop site to Firefox OS"
    },
    "989631": {
        "url": "http://sunarp.gob.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sunarp.gob.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "sunarp.gob.pe sends desktop site to Firefox OS"
    },
    "995768": {
        "url": "http://condusef.gob.mx",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "iphone.condusef.gob.mx" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "condusef.gob.mx sends desktop site to Firefox OS"
    },
    "995769": {
        "url": "http://metlife.com.mx",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.metlife.com.mx" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "metlife.com.mx sends desktop site to Firefox OS"
    },
    "991078": {
        "url": "http://bdnews24.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bdnews24.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bdnews24.com sends desktop site to Firefox OS"
    },
    "999968": {
        "url": "http://zbozi.cz",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "zbozi.cz sends simplified site to Firefox OS"
    },
    "986895": {
        "url": "http://www.echo.msk.ru/tags/2673/",
        "steps": [
            function(){return hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "echo.msk.ru \u2014 HTML5 Video not working in Firefox"
    },
    "980564": {
        "url": "http://www.newegg.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.newegg.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "newegg.com returns desktop not mobile site to Firefox Android and Firefox OS"
    },
    "993855": {
        "url": "http://elance.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.elance.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "elance.com sends desktop site to Firefox OS"
    },
    "993877": {
        "url": "http://ebay.in",
        "steps": [
            function(){return location.hostname === "m.ebay.in";}
        ],
        "ua": "FirefoxOS",
        "title": "ebay.in sends desktop site to Firefox OS"
    },
    "985314": {
        "url": "http://chinaz.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "cm.chinaz.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "chinaz.com sends desktop site to Firefox OS"
    },
    "997728": {
        "url": "http://shop.mango.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Shop.mango.com responsive site shows desktop view on Firefox OS"
    },
    "991086": {
        "url": "http://dhakatimes.com.bd",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.dhakatimes.com.bd";}
        ],
        "ua": "FirefoxOS",
        "title": "dhakatimes.com.bd sends desktop site to Firefox OS"
    },
    "979143": {
        "url": "http://laverdad.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS1.4",
        "title": "laverdad.com sends desktop site to Firefox OS"
    },
    "999982": {
        "url": "http://actualno.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.actualno.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "actualno.com sends desktop site to Firefox OS"
    },
    "999983": {
        "url": "http://btvnews.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.btvnews.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "btvnews.bg sends desktop site to Firefox OS"
    },
    "999980": {
        "url": "http://predpriemach.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "predpriemach.com sends desktop site to Firefox OS"
    },
    "999981": {
        "url": "http://inews.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.inews.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "inews.bg sends desktop site to Firefox OS"
    },
    "1008509": {
        "url": "http://origo.hu",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.origo.hu";}
        ],
        "ua": "FirefoxOS",
        "title": "origo.hu sends desktop site to Firefox OS"
    },
    "999984": {
        "url": "http://mail.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mail.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "mail.bg sends desktop site to Firefox OS"
    },
    "999985": {
        "url": "http://webcafe.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.webcafe.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "webcafe.bg sends desktop site to Firefox OS"
    },
    "993856": {
        "url": "http://grotal.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "grotal.com sends simplified site to Firefox OS"
    },
    "993857": {
        "url": "http://tn.gov.in",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "tn.gov.in sends desktop site to Firefox OS"
    },
    "993872": {
        "url": "http://icicilombard.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "icicilombard.com sends desktop site to Firefox OS"
    },
    "907674": {
        "url": "http://www.ehow.com/slideshow_12290215_smitten-kittens-learn-care-basics.html",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "can't swipe to next slide on ehow.com mobile"
    },
    "993852": {
        "url": "http://amarujala.com",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags() && location.hostname === "m.amarujala.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "amarujala.com sends desktop site to Firefox OS"
    },
    "993853": {
        "url": "http://greatandhra.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.greatandhra.com";}
        ],
        "ua": "FirefoxOS",
        "title": "greatandhra.com sends desktop site to Firefox OS"
    },
    "993876": {
        "url": "http://ebs.in",
        "steps": [
            function(){return hasViewportMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "ebs.in sends desktop site to Firefox OS"
    },
    "993851": {
        "url": "http://commonfloor.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "commonfloor.com sends desktop site to Firefox OS"
    },
    "989671": {
        "url": "http://inei.gob.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.inei.gob.pe" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "inei.gob.pe sends desktop site to Firefox OS"
    },
    "989670": {
        "url": "http://mintra.gob.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.trabajo.gob.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "mintra.gob.pe sends desktop site to Firefox OS"
    },
    "989672": {
        "url": "http://trabajo.gob.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.trabajo.gob.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "trabajo.gob.pe sends desktop site to Firefox OS"
    },
    "999977": {
        "url": "http://grabo.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.grabo.bg" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "grabo.bg sends desktop site to Firefox OS"
    },
    "986028": {
        "url": "http://www.henrys.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.henrys.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Henrys.com serves desktop site to Firefox OS instead of mobile"
    },
    "999975": {
        "url": "http://dir.bg",
        "steps": [
            function(){return location.hostname === "smart.dir.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "dir.bg sends desktop site to Firefox OS"
    },
    "995775": {
        "url": "http://tranquilidad-hogar.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.tranquilidad-hogar.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "tranquilidad-hogar.com sends desktop site to Firefox OS"
    },
    "993858": {
        "url": "http://indiankanoon.org",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "indiankanoon.org sends desktop site to Firefox OS"
    },
    "995809": {
        "url": "http://sinaloa.gob.mx",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "sinaloa.gob.mx sends desktop site to Firefox OS"
    },
    "999970": {
        "url": "http://abv.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.abv.bg" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "abv.bg sends desktop site to Firefox OS"
    },
    "986042": {
        "url": "http://www.vogue.it/",
        "steps": [
            function(){return location.hostname === "m.vogue.it";}
        ],
        "ua": "FirefoxOS",
        "title": "Vogue.it sends Firefox OS to desktop site instead of mobile"
    },
    "999979": {
        "url": "http://fakti.bg",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.fakti.bg" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "fakti.bg sends desktop site to Firefox OS"
    },
    "991211": {
        "url": "http://seccionamarilla.com.mx",
        "steps": [
            function(){return location.hostname === "m.seccionamarilla.com.mx";}
        ],
        "ua": "FirefoxOS",
        "title": "seccionamarilla.com.mx sends desktop site to Firefox OS"
    },
    "1000008": {
        "url": "http://fxstreet.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.fxstreet.com";}
        ],
        "ua": "FirefoxOS",
        "title": "fxstreet.com sends desktop site to Firefox OS"
    },
    "998881": {
        "url": "http://blog.livedoor.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "blog.livedoor.com delivers desktop content to Firefox OS"
    },
    "990701": {
        "url": "http://prothom-alo.com",
        "steps": [
            function(){return location.hostname === "m.prothom-alo.com";}
        ],
        "ua": "FirefoxOS",
        "title": "prothom-alo.com sends desktop site to Firefox OS"
    },
    "988761": {
        "url": "http://youku.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "youku.com sends desktop site to Firefox OS"
    },/*
    "996435": {
        "url": "http://drive.vw-up.jp/",
        "steps": [
            function(){},
            function(){},
            function(){return location.pathname.indexOf('not-supported') === -1;}
        ],
        "ua": "FirefoxAndroid",
        "title": "drive.vw-up.jp is blocking most browsers"
    },*/
    "979155": {
        "url": "http://yoyopress.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "yoyopress.com sends desktop site to Firefox OS"
    },
    "990727": {
        "url": "http://badoo.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "badoo.com sends simplified content to Firefox OS"
    },
    "993879": {
        "url": "http://samsung.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.samsung.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "samsung.com sends desktop site to Firefox OS"
    },
    "753426": {
        "url": "http://m.zappos.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return getComputedStyle(document.getElementsByName('c1')[0]).backgroundPosition != '0% 0%'}
        ],
        "title": "Layout issues on m.zappos.com"
    },
    "973463": {
        "url": "http://m.fisher-price.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('mycarousel').parentNode.className.indexOf('right')===-1}
        ],
        "title": "m.fisher-price.com has messy layout in Firefox for Android and Firefox OS"
    },
    "978843": {
        "url": "http://telam.com.ar",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('/movil/') === 0 }
        ],
        "title": "telam.com.ar sends desktop site to Firefox OS"
    },
    "957596": {
        "url": "http://m.xiangha.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return getComputedStyle( document.querySelector('header nav ul') ).display === 'flex'}
        ],
        "title": "m.xiangha.com - broken rendering of navigation menu"
    },
    "976956": {
        "url": "http://m.juegos.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.images.length > 1}
        ],
        "title": "m.juegos.com fails to load in Firefox on Android because JavaScript assumes Android version number is in UA string"
    },
    "957956": {
        "url": "http://book.easou.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.scripts.length > 1}
        ],
        "title": "book.easou.com sends simplified mobile page to Firefox OS and Firefox on Android"
    },
    "962130": {
        "url": "https://github.com/g13n/ua.js/blob/master/src/ua.js#L90-L100",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(document.body.textContent.indexOf('isTablet:')==-1)return 'delay-and-retry'; return document.body.textContent.indexOf('isTablet: detect(/(ipad|android(?!.*mobile)|tablet)/i)') > -1}
        ],
        "title": "ua.js fails to recognize FxOS Tablet UA as tablet device"
    },
    "922000": {
        "url": "http://m.r7.com/universalizationLayer/m/t/videos",
        "ua": "FirefoxOS",
        "steps": [
            function(){for(var i=0; i<document.links.length; i++){if(document.links[i].style.display === 'block'){document.links[i].click();return null;}}},
            function(){return document.body.textContent.indexOf('Desculpe nos')===-1}
        ],
        "title": "m.r7.com can\u2019t play a video"
    },
    "977376": {
        "url": "http://android.clarin.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.images.length>=10;}
        ],
        "title": "clarin.com mobile site never loads in Firefox OS web browser"
    },
    "956391": {
        "url": "http://rideonrealtime.com/RealTime.aspx",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){return typeof __doPostBack === 'function' }
        ],
        "title": "VTA real time transit map does not work in Firefox for Android"
    },
    "974802": {
        "url": "http://indiarailinfo.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname === 'm.indiarailinfo.com'}
        ],
        "title": "indiarailinfo.com sends desktop site to Firefox OS"
    },
    "945960": {
        "url": "http://tieba.baidu.com/",
        "steps": [
            function(){return hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "tieba.baidu.com serves desktop content to Firefox OS"
    },
    "959481": {
        "url": "http://m.tieyou.com",
        "steps": [
            function(){},/* js sniffing needs some time to run - a dummy function for the first load */
            function(){ if(window.IsPC)return ! window.IsPC();  return hasViewportMeta() && location.hostname === "m.tieyou.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.tieyou.com sends desktop site to Firefox OS"
    },
    "826338" : {
        url: 'http://yahoo.com/',
         ua: "FirefoxOS",
        steps:[function(){return document.getElementById('MobileUH') != null}]
    },
    "920342": {
        "url": "http://newyork.schmap.com/",
        "steps": [
            function(){
                if(document.readyState != 'complete') return 'delay-and-retry';
                return document.getElementById('rotationalert').style.display === 'none';
            }
        ],
        "ua": "FirefoxAndroid",
        "title": "Schmap blocks Firefox for Android users from using site"
    },
    '969832' : {
        url:'http://bild.de',
        ua:'FirefoxOS',
        steps:[function(){}, function(){return location.hostname === 'wap.bild.de';}],
        title:'bild.de sends desktop version to FxOS'
    },
    '969845' : {
        url:'http://rtl.de',
        ua:'FirefoxOS',
        steps:[function(){}, function(){return location.hostname === 'mobil.rtl.de';}],
        title:''
    },
    "972374": {
        "url": "http://ikea.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ikea.com" ;}
        ],
        "ua": "FirefoxOS1.4",
        "title": "ikea.com sends desktop site to Firefox OS"
    },
    '974797' : {
        url:'http://shine.com',
        ua:'FirefoxOS1.4',
        steps:[function(){return location.hostname=='m.shine.com'}],
        "title":"shine.com sends desktop site to Firefox OS"
    },
    '878630' : {
        url:'http://ask.com',
        ua:'FirefoxOS',
        steps:[ function(){return mobileLinkOrScriptUrl('/mobile/')} ]
    },
    "959970": {
        "url": "http://fnb.mobi",
        "steps": [
            function(){},
            function(){if(/REDIRECT/.test(location.pathname))return 'delay-and-retry'; return hasViewportMeta() && location.hostname == 'ww2.fnb.mobi';}
        ],
        "ua": "FirefoxOS1.4",
        "title": "fnb.mobi sends simplified site to Firefox OS"
    },
    "959735": {
        "url": "http://www.wired.com/design/2014/01/super-detailed-photos-of-snowflakes-shot-with-hacked-camera/",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(!document.querySelector('.entry p'))return 'delay-and-retry';return getComputedStyle(document.querySelector('.entry p')).wordBreak != 'break-word'}
        ],
        "title": "Wired.com is not word wrapping properly for Firefox Android"
    },
    "964612": {
        "url": "http://www.slate.fr/",
        "steps": [
            function(){return location.hostname =='m.slate.fr'}
        ],
        "ua": "FirefoxOS",
        "title": "www.slate.fr has broken layout in Firefox OS"
    },
    "911601": {
        "url": "http://www.reuters.com/finance/stocks/OPERA.OL/key-developments/article/2833426",
        "ua": "FirefoxAndroid",
        "steps": [ /* If this page completes loading, the problem is fixed. Lovely and simple pass condition :) */
            function(){return document.title != 'Page Load Error'}
        ],
        "title": "redirect loop on Reuters page"
    },
    "921536": {
        "url": "http://www.google.com/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return ! (document.getElementById('gbg').pathname == '/mobile/')}
        ],
        "title": "Google menu icon in the top-left corner in Firefox doesn't open a menu"
    },
    "960895": {
        "url": "http://zozo.jp",
        "steps": [
            function(){return location.pathname.indexOf('/sp/')==0}
        ],
        "ua": "FirefoxOS",
        "title": "zozo.jp sends desktop site to Firefox OS"
    },
    "942071": {
        "url": "http://view.vzaar.com/1165951/player",
        "steps": [
            function(){return document.getElementsByTagName('video')[0].className.indexOf('flash_error')==-1}
        ],
        "ua": "FirefoxOS",
        "title": "vzaar.com says browser can't play HTML5 (MP4) video"
    },
    "973263": {
        "url": "http://www.swisschalet.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.swisschalet.com";}
        ],
        "title": "Swisschalet.com serves desktop site to Firefox OS"
    },
    "971235": {
        "url": "http://www.pcmag.com",
        "steps": [
            function(){return location.hostname == 'mobile.pcmag.com'}
        ],
        "ua": "FirefoxOS",
        "title": "Pcmag.com serves mobile site to iPhone, Chrome, Opera. Desktop site to Firefox mobile,"
    },
    "957960": {
        "url": "http://m.hongshu.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return getComputedStyle(document.querySelector('nav ul li')).flex != '';}
        ],
        "title": "m.hongshu.com navigation rendering broken due to -webkit- CSS for flexbox"
    },
    "931905": {
        "url": "http://i.news.pathfinder.gr",
        "steps": [
            function(){return document.getElementById('head-nav').style.display!='none'}
        ],
        "ua": "FirefoxOS",
        "title": "i.pathfinder.gr doesn't render properly on Firefox for Android"
    },
    "957515": {
        "url": "http://m.xxsy.net",
        "ua": "FirefoxOS",
        "steps": [
            function(){return getComputedStyle(document.querySelector('nav ul')).flex != '';}
        ],
        "title": "m.xxsy.net - webkit styling breaks layout"
    },
    "972371": {
        "url": "http://ba.no",
        "steps": [
            function(){return location.hostname == 'mobil.ba.no'}
        ],
        "ua": "FirefoxOS",
        "title": "ba.no sends desktop site to Firefox OS"
    },
    "966310": {
        "url": "http://www.postmedia.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('/mobile/')>-1 || location.pathname.indexOf('/touch/')>-1}
        ],
        "title": "Postmedia sites not serving mobile content to Firefox"
    },
    "965124": {
        "url": "http://www.finegardening.com/Videos/",
        "steps": [
            function(){if(!document.getElementById('_containersinglePlayer100052'))return 'delay-and-retry'; return document.querySelector('img[src*="admin.brightcove.com/viewer/upgrade_flash_player"]') == null}
        ],
        "ua": "FirefoxOS",
        "title": "finegardening.com videos do not play (brightcove)"
    },
    "941610": {
        "url": "http://www.cinemax.com/video/",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(!document.getElementById('_containerplayer1'))return 'delay-and-retry'; return document.querySelector('img[src*="admin.brightcove.com/viewer/upgrade_flash_player"]') == null}
        ],
        "title": "cinemax.com doesn't play video (uses Brightcove, shows flash error)"
    },
    "970852": {
        "url": "http://readingrockets.org/shows/",
        "steps": [
            function(){return document.querySelector('img[src*="admin.brightcove.com/viewer/upgrade_flash_player"]') == null}
        ],
        "ua": "FirefoxOS",
        "title": "readingrockets.org doesn't play video in Firefox OS"
    },
    "963595": {
        "url": "https://raw2.github.com/fnando/browser/master/lib/browser/methods/devices.rb",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.body.textContent.match(/\/Tablet/) != null}
        ],
        "title": "browser gem doesn't recognize Firefox OS tablet ua as tablet"
    },
    "969861": {
        "url": "http://www.mydealz.de",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('fb-root')==null}
        ],
        "title": "mydealz.de sends desktop site to Firefox OS"
    },
    "878255" : {
        url: 'http://24sata.hr',
         ua: "FirefoxOS",
         /* there's a script on the mobile page that bumps us to the desktop page, needs time to run */
        steps:[function(){}, function(){return location.hostname.indexOf("m.24sata.hr")>-1 && hasViewportMeta()}]
    },
    "973354": {
        "url": "http://www.nhl.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "title": "NHL.com serves desktop content to Firefox OS"
    },
    "921532": {
        "url": "http://images.google.com/search?q=Lira&tbm=isch#",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){return document.getElementById('mnav')===null}
        ],
        "title": "Google images on Firefox Android doesn't load images as you scroll"
    },
    "960851": {
        "url": "http://www.sponichi.co.jp",
        "steps": [
            function(){return document.getElementById('sp_switch')!=null}
        ],
        "ua": "FirefoxOS",
        "title": "www.sponichi.co.jp shows \"view mobile site\" banner in other mobile browsers, not in Firefox OS"
    },
    "911150": {
        "url": "http://elpais.com/m/",
        "ua": "FirefoxOS",
        "steps": [
            /* the problematic script only runs if window.MozActivity exists, test might not work in slimerjs and on desktop.. */
            function(){if(!('MozActivity' in window)){return 'can\'t test, window.MozActivity missing';}var l=document.querySelectorAll('a[href^="javascript:"]'); if(l.length==0) return 'delay-and-retry'; for(var i=0;i<l.length;i++){if(l[i].getAttribute('target') == '_blank')return false; } return true;}
        ],
        "injectScript": "window.MozActivity = window.MozActivity||function(o){console.log('Oops.. ');}",
        "title": "elpais.com mobile site opens blank tab on video start"
    },
    "958514": {
        "url": "https://www.tripcase.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.tripcase.com" && getComputedStyle(document.querySelector('.tc-button-green'), '').background!='';}
        ],
        "ua": "FirefoxOS",
        "title": "tripcase.com mobile site doesn't display gradients correctly"
    },
    "970856": {
        "url": "http://www.sesamestreet.org/videos",
        "steps": [
            /* If JSON data from the server comes back with a video, they set location.hash to make it bookmarkable */
            function(){if(document.getElementById('ump-media').childElementCount===0)return 'delay-and-retry'; return location.hash!=='';}
        ],
        "ua": "FirefoxOS",
        "title": "sesamestreet.org says \"can't find what you're looking for\" on video page"
    },
    "970849": {
        "url": "http://edition.cnn.com/video/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "cnn.com video doesn't play in Firefox OS"
    },
    "960893": {
        "url": "http://www.asahi.com/",
        "steps": [
            function(){for(var i=0,el;el=document.links[i];i++){if(el.href.indexOf('sp/guide_smp.html')>-1)return true;} return false;}
        ],
        "ua": "FirefoxOS",
        "title": "asahi.com doesn't offer banner advertising mobile content site to Firefox OS"
    },
    "956972": {
        "url": "http://m.yahoo.co.jp",
        "steps": [
            /* if we're on m.yahoo.co.jp and there's *not* a header__items element, this test will throw - on purpose so we can update it */
            function(){return hasViewportMeta() && location.hostname === "m.yahoo.co.jp" && getComputedStyle(document.querySelector('.header__items')).flex != '';}
        ],
        "ua": "FirefoxOS",
        "title": "Messy rendering on Yahoo Japan mobile site"
    },
    "921986": {
        "url": "http://m.rpp.com.pe/portada.php",
        "ua": "FirefoxOS",
        "steps": [
            function(){document.querySelector('*[class*="icon_video"]').parentElement.click(); },
            function(){
                if(document.getElementsByTagName('object').length){
                    if(/player\.swf/.test(document.getElementsByTagName('object')[0].data))return false;
                }
                if(!document.getElementById('player1_jwplayer_display_icon')){
                    return 'delay-and-retry';
                }
                document.getElementById('player1_jwplayer_display_icon').click();
                return document.getElementsByTagName('video').length>0
            }
        ],
        "title": "m.rpp.com.pe can't play a video"
    },
    "957958": {
        "url": "http://idnes.cz",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname === 't.idnes.cz'}
        ],
        "title": "idnes.cz offers simple content for Firefox OS"
    },
    "966850": {
        "url": "http://screen.yahoo.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){document.querySelector('li.thumb a').click(); },
            function(){if(document.querySelectorAll('video, object').length===0)return 'delay-and-retry'; return document.querySelector('video')!=null;}
        ],
        "title": "screen.yahoo.com sniffing falls back to Flash, does not play video"
    },
    "931860": {
        "url": "http://www.realmobile.gr",
        "steps": [
            function(){location.hostname === "www.realmobile.gr" && getComputedStyle(document.querySelector('.list .title'), '').background != "";}
        ],
        "ua": "FirefoxAndroid",
        "title": "realmobile.gr doesn't render properly on Firefox for Android"
    },
    "967043": {
        "url": "http://51degrees.com/Resources/UserAgentTester",
        "steps": [
            function(){document.querySelector('input[type="submit"]').click();},
            function(){if(!document.body.textContent.match(/IsMobile/))return 'delay-and-retry'; return document.body.textContent.match(/IsSmartPhone\s*True/) != null;}
        ],
        "ua": "FirefoxOS",
        "title": "51degrees categorizes FxOS as is_smartphone = false"
    },
    "973528": {
        "url": "http://m.aljazeera.com/home/watch",
        "steps": [
            /*Not sure if this is a suitable pass condition.. do we support rtsp:??*/
            function(){for(var i=0,el;el=document.links[i];i++){if(el.protocol === 'rtsp:')return true;}return false;}
        ],
        "ua": "FirefoxOS",
        "title": "aljazeera.com shows neither video nor plays audio, courtesy of BrightCove"
    },
    "957958": {
        "url": "http://m.idnes.cz/",
        "steps": [
            function(){return location.hostname == 't.idnes.cz';}
        ],
        "ua": "FirefoxOS",
        "title": "m.idnes.cz serves basic mobile site to Firefox for OS"
    },
    "784478": {
        "url": "http://m.taobao.com/",
        "steps": [
            function(){ // sometimes we get a splash screen..
                if(document.links.length === 1)document.links[0].click();
            },
            function(){
                if(document.readyState != 'complete') return 'delay-and-retry';
                return document.getElementsByClassName('suggest').length>0;
            }
        ],
        "ua": "FirefoxAndroid",
        "title": "taobao.com serves basic mobile site to Firefox for Android"
    },
    "959133": {
        "url": "http://wap.soso.com",
        "steps": [
            function(){return hasMobileOptimizedMeta() && document.querySelector('nav a') != null;}
        ],
        "ua": "FirefoxOS",
        "title": "wap.soso.com sends simplified mobile site"
    },
    "957517": {
        "url": "http://smart.mail.163.com",
        "steps": [function(){}, /*js redirect on first page, wait for next load*/
            function(){
                if(!document.getElementById('username'))return 'delay-and-retry';
                return getComputedStyle(document.getElementById('username'), '').backgroundColor !== 'transparent' && getComputedStyle(document.getElementsByClassName('loginBtn')[0], '').backgroundColor !== 'transparent';
            }
        ],
        "ua": "FirefoxAndroid",
        "title": "smart.mail.163.com - some odd rendering on login page"
    },
    "878224" : {
        url: 'http://badoo.com',
         ua: "FirefoxOS",
         /* "not desktop" -test*/
        steps:[function(){return document.getElementById('footwrap')==null}]
    },
    "887224" : {
        url: 'http://elmundo.es/movil2',
         ua: "FirefoxOS",
        steps:[function(){return (mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/) || document.getElementById('popup-cambio-version') != null }]
    },
    "933439": {
        "url": "http://grooveshark.com/",
        "steps": [
            function(){return location.hostname.indexOf('mobile')>-1 || location.hostname.indexOf('html5')>-1;}
        ],
        "ua": "FirefoxOS",
        "title": "grooveshark.com doesn't recognize B2G as mobile"
    },
    "933642": {
        "url": "http://www.mysmartprice.com/",
        "steps": [
            function(){return mobileLinkOrScriptUrl() && location.pathname.indexOf('m/')>-1;}
        ],
        "ua": "FirefoxOS",
        "title": "mysmartprice.com isn't redirecting to mobile site on Firefox OS"
    },
    "933652": {
        "url": "http://gaana.com/",
        "steps": [
            function(){return location.hostname === 'touch.gaana.com';}
        ],
        "ua": "FirefoxOS",
        "title": "gaana.com isn't redirecting to mobile site on Firefox OS"
    },
    "935895": {
        "url": "http://uk.eonline.com",
        "steps": [
            function(){return location.hostname === "eprotoeu.mtiny.com";}
        ],
        "ua": "FirefoxOS",
        "title": "uk.eonline.com sends desktop content"
    },
    "794100": { /* TODO: why does this give a false pass? */
        "url": "http://support.brightcove.com/en/docs/video-test-html-5",
        "steps": [
            function(){for (var i = 0; i < document.links.length; i++) {
                if(document.links[i].href.indexOf('adobe.com/go/getflash')>-1)return false;
            }; return true;}
        ],
        "ua": "FirefoxOS",
        "title": "h264 video player (Brightcove) is busted on non-flash enabled FF Android or FF OS"
    },
    "935657": {
        "url": "http://wfp.to/vKc",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "wfp is blocking Gecko/25 (bad behavior framework)"
    },
    /*
    "732355": {
        "url": "http://m.flickr.com/photos/gen/2592947296/lightbox",
        "ua": "FirefoxOS",
        "steps": [
            function(){try{return document.querySelector('div.img').style.backgroundImage != '';}catch(e){return 'delay-and-retry';};}
        ],
        "title": "Photos are not displayed in photo slideshows at flickr.com"
    }, */
    "957846": {
        "url": "http://wap.2kk.mobi",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementsByClassName('header').length>0;}
        ],
        "title": "wap.2kk.mobi sends desktop site to Firefox OS"
    },
    "957596": {
        "url": "http://m.xiangha.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return getComputedStyle(document.querySelector('nav ul'),'').display === 'flex';}
        ],
        "title": "m.xiangha.com - broken rendering of navigation menu"
    },
    "960429": {
        "url": "http://seesaa.net",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('s/')>-1 || hasViewportMeta()}
        ],
        "title": "seesaa.net / blog.seesaa.jp sends desktop site to Firefox OS"
    },
    "933645": {
        "url": "http://timesofindia.com/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname == 'm.timesofindia.com'}
        ],
        "title": "timesofindia.com isn't redirecting to mobile site on Firefox OS"
    },
    "960451": {
        "url": "http://okwave.jp",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementsByClassName('spn_induce_new').length > 0}
        ],
        "title": "okwave.jp shows a banner for switching to mobile site to other mobile browsers, not to Firefox OS"
    },
    "775919": {
        "url": "http://www.bbc.co.uk/iplayer",
        "ua": "FirefoxOS",
        "steps": [
            function(){return !/Not Supported/i.test(document.title)}
        ],
        "title": "BBC iPlayer does not detect the Firefox UA"
    },
    "959468": {
        "url": "http://m.self.com.cn",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(document.querySelector('.nav-panel section p'))return getComputedStyle(document.querySelector('.nav-panel section p'),'').display === 'flex'; }
        ],
        "title": "m.self.com.cn has layout issues in Firefox OS"
    },
    "931822": {
        "url": "http://www.skai.gr",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('mobile')>-1}
        ],
        "title": "skai.gr doesn't redirect to mobile site on Firefox OS"
    },
    "957590": {
        "url": "http://weather1.sina.cn",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.search.indexOf('vt=1')==-1;}
        ],
        "title": "weather1.sina.cn sends simplified mobile page to Firefox OS"
    },
    "957827": {
        "url": "http://wap.elong.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){}, /*give the JS time to run and possibly redirect*/
            function(){return location.hostname=='m.elong.com';}
        ],
        "title": "wap.elong.com does not automatically redirect to m.elong.com"
    },
    "942305": {
        "url": "http://www.redbus.in/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('mob')>-1}
        ],
        "title": "redbus.in isn't redirecting to mobile site on Firefox OS"
    },
    "937477": {
        "url": "http://www.dafiti.com.br",
        "ua": "FirefoxOS",
        "steps": [
            function(){},
            function(){
                return location.hostname == 'm.dafiti.com.br'
            }
        ],
        "title": "dafiti.com.br doesn't recognize B2G UA as mobile"
    },
    "957956": {
        "url": "http://book.easou.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.scripts.length>1}
        ],
        "title": "book.easou.com sends simplified mobile page to Firefox OS and Firefox on Android"
    },
    "960026": {
        "url": "http://tripadvisor.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('carouselWrapper')!=null}
        ],
        "title": "tripadvisor.com sends simplified mobile site to Firefox OS"
    },
    "960022": {
        "url": "http://fin24.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementsByClassName('relative').length>3}
        ],
        "title": "fin24.com sends simplified site to Firefox OS"
    },
    "960019": {
        "url": "http://supersport.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname.indexOf('mobi.supersport')>-1 }
        ],
        "title": "supersport.com sends desktop site to Firefox OS"
    },
    "959498": {
        "url": "http://m.caixin.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.body.getElementsByTagName('*').length>0 }
        ],
        "title": "m.caixin.com javascript sniffer shows blank page in Firefox OS"
    },
    "754750": {
        "url": "http://www.google.com/m/finance",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('markets-summary')!=null}
        ],
        "title": "Google Finance - Suboptimal site, not optimized site renders on Fennec Native Due to UA sniffing"
    },
    "679025": {
        "url": "http://www.google.com/finance?q=NASDAQ:GOOG",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementById('markets-summary')!=null}
        ],
        "title": "finance.google.com presents null error on initial load"
    },
    "959137": {
        "url": "http://bendi.m.taobao.com/coupon/q/index.htm",
        "ua": "FirefoxOS",
        "steps": [
            function(){return document.getElementsByClassName('shop-item').length > 0}
        ],
        "title": "bendi.m.taobao.com coupon site never finishes loading, assumes global event variable in event handler"
    },
    "948926": {
        "url": "https://touch.groupon.com/login",
        "ua": "FirefoxOS",
        "steps": [
            function(){return /gradient/.test(getComputedStyle(document.getElementsByTagName('header')[0],'').backgroundImage)}
        ],
        "title": "Groupon login page is white washed"
    },
    "959146": {
        "url": "http://zuoche.com/m/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.pathname.indexOf('touch')>-1}
        ],
        "title": "zuoche.com/m/ sends simplified site to Firefox OS"
    },
    "887788": {
        "url": "http://starmedia.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname=='m.starmedia.com'}
        ],
        "title": "m.starmedia.com doesn't display correctly in Gaia browser"
    },
    "945958": {
        "url": "http://music.baidu.com/",
        "ua": "FirefoxOS",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "title": "music.baidu.com serves desktop content to Firefox OS"
    },
    "957527": {
        "url": "http://m.qzone.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){}, /* first page redirects elsewhere.. */
            function(){return getComputedStyle(document.querySelector('.dl-guide header'), '').backgroundSize != 'auto auto'}
        ],
        "title": "m.qzone.com login page - background to large, makes header messy"
    },
    "956915": { // TODO: for some reason the failure doesn't occur with SlimerJS..
        "url": "http://thedailybanter.com",
        "ua": "FirefoxAndroid",
        "steps": [
            function (argument) {
                /* delay until after doc.write..? */
            },
            function(){return document.body.firstChild.textContent.indexOf('load:function')==-1}
        ],
        "title": "thedailybanter.com does not work in Firefox for Android"
    },
    "793216": {
        "url": "http://images.google.com/",
        "ua": "FirefoxAndroidTablet",
        "steps": [
            function(){
                if(window._moz_793216_clicked){
                    return window._moz_transform_was_set;
                }
                window._moz_transform_was_set=false;
                CSS2Properties.prototype.__defineSetter__('-moz-transform', function(str){window._moz_transform_was_set=true;});
                for(var i=0;i<document.links.length;i++)if(document.links[i].href.indexOf('imgrefurl')>-1){document.links[i].click();break;}
                window._moz_793216_clicked = true;
                return 'delay-and-retry';
            }
        ],
        "title": "images.google.com image single view carrousel is stacked on tablet"
    },
    "958930": {
        "url": "http://u.web2go.com/upsell/getpasses.do?pcat=ILT&rorigin=100INTLPassr",
        "ua": "FirefoxAndroid",
        "steps": [
            function(){return document.title.indexOf('Error 400')==-1}
        ],
        "title": "T-Mobile international data-upgrade site serves 400 to any UA with \"Firefox\" token"
    },
    "940313": {
        "url": "http://m.mtv.com/videos/video.rbml?id=mgid:uma:video:mtv.com:968635&source=musicvideos",
        "ua": "FirefoxOS",
        "steps": [
            function(){if(!document.getElementById('video-player'))return 'delay-and-retry'},
            function(){return document.getElementById('video-player').getElementsByTagName('iframe').length>0;}
        ],
        "title": "mtv.com: No video in Firefox OS or Firefox on Android"
    },
    "961964": {
        "url": "http://usatoday.com",
        "ua": "FirefoxOS",
        "steps": [
            function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() }
        ],
        "title": "usatoday.com serves desktop version to Firefox OS"
    },
    "931849": {
        "url": "http://www.real.gr",
        "ua": "FirefoxOS",
        /* Note: Client-side sniffing involved, this script risks running too early.. */
        "steps": [
            function(){ /*ignore first page load, wait for navigation..*/ },
            function(){return location.hostname.indexOf('realmobile.gr')>-1}
        ]
    },
    "935946": {
        "url": "http://webtv.un.org",
        "ua": "FirefoxOS",
        "steps": [function(){if(document.getElementsByClassName('BrightcoveExperience')[0])return 'delay-and-retry';},
         function () { for (var i = document.links.length - 1; i >= 0; i--) {
            if(document.links[i].href.indexOf('adobe.com/go/getflash/')>-1)return false;
        }; return true;}]
    },

    "958510": {
        "url": "https://www.tripcase.com",
        "ua": "FirefoxOS",
        "steps": [function(){return hasViewportMeta() && location.hostname === "www.tripcase.com" && mobileLinkOrScriptUrl();}]
    },
    "931989": {
        "url": "http://www.weather.gr",
        "ua": "FirefoxOS",
        "steps": [
            function(){return mobileLinkOrScriptUrl() /*regression test*/}
        ],
        "title": "weather.gr doesn't redirect to mobile site on Firefox OS"
    },
    /*"931914": {
        "url": "http://www.ricardo.gr",
        "ua": "FirefoxOS",
        "steps": [
            function(){return location.hostname.indexOf('m.ricardo')>-1 }
        ],
        "title": "ricardo.gr doesn't redirect to mobile site on Firefox OS"
    },*/
    "957440" : {
        url: 'http://sina.cn/',
         ua: "FirefoxOS",
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    "934857" : {
		url: 'http://m.txu.com/',
		 ua: "FirefoxOS",
		steps:[noWapContentPlease],
		testType:'xhr'
	},
    "827632" : {
		url: 'http://tecmundo.com.br',
		 ua: "FirefoxOS",
         /* This was oddly passing, though site was not fixed. Trying to add a check for the number of scripts.. */
         /* July 2014: 48 scripts on desktop site, 23 on mobile site.. */
		steps:[function(){return hasViewportMeta() && document.getElementsByTagName('script').length<30}]
	},
    "935472" : {
		url: 'http://blip.tv/commercialbreak/selling-out-colleen-ryan-6687803',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/ && document.getElementById('PlayeriFrame')!==null}]
	},
    /*'924386' : {
        url:'https://mobile.twitter.com/trutherbot',
        ua:'FirefoxAndroid',
        steps:[function(){
            var elm = document.getElementsByClassName('media-strip')[0];
            if(!elm)return 'delay-and-retry';
            return elm && elm.getElementsByTagName('picture').length>0?true:false;
        }]
    },*/
    '868298' : {
        url:'http://www.bing.com/videos/search?q=cats&FORM=HDRSC3',
        ua:'FirefoxAndroid',
        /* thumbnail elements - Bing changes the markup frequently but let's hope this is stableish */
        steps:[function(){return document.querySelectorAll('*[class*="humb"]').length!=0}]
    },
    "913590" : {
		url: 'http://www.lepoint.fr',
		 ua: "FirefoxOS1.1",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "907518" : {
		url: 'http://info.3g.qq.com/',
		 ua: "FirefoxAndroid",
		steps:[function(){return getComputedStyle(document.getElementsByClassName('main-nav-list')[0]).display === 'flex'; /*document.body.className.indexOf('index')>-1;*/}]
	},
	"922289" : {
		url: 'http://info.3g.qq.com/',
		 ua: "FirefoxOS",
		steps:[noWapContentPlease],
		testType:'xhr'
	},
	"788535" : {
		url: 'http://www.bravestman.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.pathname.indexOf('/unsupported')===-1;}]
	},
	"798769" : {
		url: 'http://m.novinky.cz/articleDetails?aId=280744',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() && hasVideoTags()}]
	},
	"754092" : {
		url: 'http://icloud.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() && location.pathname.indexOf('unsupported_')===-1}]
	},
	"916250" : {
		url: 'http://litedetection.apachemobilefilter.org/index.php?amf=Mozilla%2F5.0+%28Mobile%3B+rv%3A18.0%29+Gecko%2F18.0+Firefox%2F18.0',
		 ua: "FirefoxOS",
		steps:[function(){return document.body.textContent.match(/TOUCH\s*false/)?false:true;}]
	},
    '799635' : {
        url:'https://mail.mozilla.com',
        ua:'FirefoxOS',
        steps:[function(){return document.getElementById('client').value === 'mobile'}]
    },
    '795319' : {
        url:'http://m.bing.com/maps',
        ua:'FirefoxAndroid',
        steps:[function(){ return document.scripts.length > 5; }]
    },
    '1005783' : {
        url:'http://m.bing.com/maps',
        ua:'FirefoxOS',
        steps:[function(){ return document.scripts.length > 5; }]
    },
    '899541' : {
        url:'http://blackberry.com',
        ua:'FirefoxOS',
        /* "mobile" browsers get a <select> country-selector */
        steps:[function(){ return document.getElementById('mySelectbox')!=null }]
    },
    '905627' : {
        url:'http://www.nhk.or.jp',
        ua:'FirefoxOS',
        steps:[function(){ return location.pathname.indexOf('/sp/')>-1 && window.g_ua && window.g_ua.SmartPhone; }]
    },
    '922357' : {
        url:'http://fidelity.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('fidelity.mobi'===-1);}]
    },
    '813365' : {
        url:'http://techcrunch.com',
        ua:'FirefoxOS',
        /* Re-load loop.. We never get to render the <nav id="navigation"> due to the redirects */
        steps:[function(){ return document.getElementsByClassName('nav-bar').length != 0; }]
    },
    '804994' : {
        url:'http://twitch.tv',
        ua:'FirefoxAndroid',
        /* Note: this should be the right pass condition after we sort out M3U8-handling */
        steps:[hasVideoTags]
    },
    '909420' : {
        url:'http://plugins.svn.wordpress.org/wptouch/trunk/core/mobile-user-agents.php',
        ua:'FirefoxOS',
        steps:[function(){ return unsafeWindow.document.body.textContent.indexOf('Firefox\', \'Mobile')>-1 }]
    },
    '907371' : {
        url:'http://s.huffpost.com/assets/css.php?f=mobileweb%2Fdev%2Fnormalize.css%2Cmobileweb%2Fdev%2Fapp.css%2Cbasic.css%2Cbuttons.css%2Cmobileweb%2Fnews%2Fauth.css&v=1380134457',
        ua:'FirefoxOS',
        steps:[function(){
            return ! /@font-face\s*\{\s*font-family:\s*"hpmobileweb";\s*src:\s*url\("\/images\/mobileweb\/hpmobileweb\.eot"\);\s*src:\s*url\("\/images\/mobileweb\/hpmobileweb\.eot\?#iefix"\) format\("embedded-opentype"\),\s*url\("\/images\/mobileweb\/hpmobileweb\.svg#hpmobileweb"\) format\("svg"\);\s*font-weight:\s*normal;\s*font-style:\s*normal;\s*/.test(document.body.textContent)
        }],
    },
    '766035' : {
        url:'http://m.zipscene.com/pjs-coffee/albums/album/738550521-simply-the-best',
        ua:'FirefoxAndroid',
        steps:[function(){ try{unsafeWindow.$(".zse-photo-thumbs a").photoSwipe();return document.getElementsByClassName('ui-icon-loading').length===0;}catch(e){if(e.message == "e.navigator.userAgent.match(...) is null")return false;} return 'indeterminate'; }]
    },
    '878647' : {
        url:'http://www.sat.gob.mx/',
        ua:'FirefoxOS',
        steps:[function(){ return unsafeWindow.Dmovil ? unsafeWindow.Dmovil() : location.pathname.indexOf('default2.htm')>-1 }]
    },
    '878632' : {
        url:'http://www.banorte.com',
        ua:'FirefoxOS',
        steps:[function(){return location.pathname.indexOf('/mobile/')>-1}]
    },
    '794629' : {
        url:'http://www.centrum.cz',
        ua:'FirefoxOS',
        steps:[function(){return location.href.indexOf('m.centrum')>-1}]
    },
    "732957" : {
    	url: 'http://adventureworld.net.au/',
		 ua: "FirefoxAndroid",
        /* Site thinks Firefox is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
	},
    "867258" : {
		url: 'http://m.fool.com',
		 ua: "FirefoxAndroid",
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
	},
    '914252' : {
        url:'https://www.google.com/calendar/',
        ua:'FirefoxAndroid',
        steps:[function(){return location.pathname.indexOf('calendar/m')===-1 /* sniffing part */ && cssCheck(['ci-btn-reg', 'ci-btn-back', 'ci-btn-right', 'ci-icn-reload', 'ci-icn-plus', 'ci-icn-right-ip'], 'borderImageSource') /* -webkit-border-image part */}],
        loginRequired:true /* this test requires logging in to Google */
    },
        '905120' : {
        url:'http://lufthansa.de',
        ua:'FirefoxOS',
        /* We should be redirected to mobile.lufthansa.com where the first page is a country/language selector,
        we must bypass it to get to the page with the problem */
        steps:[
            function(){var tmp;if(tmp=document.getElementById('language')){ if(tmp.tagName === 'SELECT')tmp.form.submit(); }},
            function(){ return location.hostname.indexOf('mobile.lufthansa')>-1 && mobileLinkOrScriptUrl('airportlist.do') }
        ]
    },
    "755879" : {
            url: 'http://pitchfork.com/',
             ua: "FirefoxOS",
            steps:[function(){return location.hostname.indexOf("m.pitchfork.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() && cssCheck(['auto'], 'transition')}]
    },
    "884874" : {
            url: 'http://technabob.com',
             ua: "FirefoxOS",
            steps:[function(){return mobileLinkOrScriptUrl('wptouch.js')&& hasViewportMeta()}]
    },
    '828431' : {
        url:'http://espn.go.com',
        ua:'FirefoxOS',
        steps:[function(){ /*NOOP - let redirect kick in*/ },function(){
            if(document.readyState != 'complete') return 'delay-and-retry';
            return location.hostname.indexOf('m.espn')>-1
        }]
    },
    '809796' : {
        url:'http://espn.go.com',
        ua:'FirefoxAndroid',
        steps:[
        function(){ /*NOOP - let redirect kick in*/ },
        function(){
            if(document.readyState != 'complete') return 'delay-and-retry';
            return document.getElementsByClassName('main-story-headlines').length > 0
        }]
    },
    '828439' : {
        url:'http://movistar.com.ve/',
        ua:'FirefoxOS',
        steps:[hasHandheldFriendlyMeta]
    },
    "843137" : {
    	url: 'http://nytimes.com',
		 ua: "FirefoxOS",
         /* The "Mobile banner" (suggesting switching to mobile site) is added from JS, so there is a race condition here */
		steps:[function(){ return location.host;
            return location.hostname.indexOf('mobile.nytimes')>-1 || document.getElementById('mobileBanner')!=null;
        }]
	},
    '826845' : {
        url:'http://techtudo.com.br/',
        ua:'FirefoxOS',
        /* Look for the "burger menu" element */
        steps:[function(){return document.getElementsByClassName('burger').length>0;}]
    },
	"828430" : {
		url: 'http://meridiano.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.href.indexOf('wap.')>-1 /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    '827634' : {
        url:'http://www.imdb.com',
        ua:'FirefoxOS',
        steps:[function(){return hasHandheldFriendlyMeta() && hasViewportMeta()  /*regression test, expected to pass*/}]
    },
    '826512' : {
        url:'http://www.amazon.com',
        ua:'FirefoxOS',
        steps:[function(){return document.documentElement.classList.contains('a-touch') /*regression test, expected to pass*/}]
    },
    '826514' : {
        url:'http://estadao.com.br',
        ua:'FirefoxOS',
        steps:[function(){return (location.hostname.indexOf('m.estadao')>-1 || mob.isMobile(navigator.userAgent)) ? true : false;}]
    },
    '826330' : {
        url:'http://www.uol.com.br/',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('m.uol.')>-1}]
    },
    '826343' : {
        url:'http://www.ig.com.br/',
        ua:'FirefoxOS',
        steps:[mobileLinkOrScriptUrl]
    },
    "881072" : {
		url: 'https://vine.co/v/b3Enwh79mdj',
		 ua: "FirefoxOS",
         /* We'd like the <video>, not Flash, please..*/
		steps:[function(){return document.getElementsByTagName('video').length>0 && document.getElementsByTagName('video')[0].currentSrc != '' ; }]
	},
    "826361" : {
		url: 'http://tumblr.com',
		 ua: "FirefoxOS",
		steps:[function(){return document.body.classList.contains('is_mobile') && document.body.classList.contains('is_mobile_handset') /*(regression test, expected to pass)*/}]
	},
    "896014" : {
        /* Requires two-step testing because the PayPal API requires that you "configure"
        the express checkout from a backend script before taking the user to the payment screen.
        First URL here is a "configuration" URL, returns a token that is required for the next step.

        Note that the test runs against the PayPal developer "sandbox", which can in theory
        be somewhat different from the live site.
        */
		url: 'https://api-3t.sandbox.paypal.com/nvp?METHOD=SetExpressCheckout&VERSION=93&USER=sdk-three_api1.sdk.com&PWD=QFZCWN5HZM8VBG7Q&SIGNATURE=A-IzJhZZjhg29XQ2qnhapuwxIDzyAZQ92FRP5dqBzVesOkzbdUONzmOU&PAYMENTREQUEST_0_AMT=5.00&PAYMENTREQUEST_0_CURRENCYCODE=USD&PAYMENTREQUEST_0_PAYMENTACTION=Sale&RETURNURL=http://www.example.org&CANCELURL=http://www.example.org',
		 ua: "FirefoxOS",
         /* Try to use the token to redirect to mobile express payment screen - if it redirects to express-payment, it's a fail */
		steps:[function(){
            if(!document.body)return 'delay-and-retry';
            var token = decodeURIComponent(document.body.textContent.match(/TOKEN=([^&]*)/)[1]);
            location.href="https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout-mobile&token="+token;
        }, function(){ if(location.hostname.indexOf('www.sandbox')==-1)return 'delay-and-retry'; return location.href.indexOf('cmd=_express-checkout-mobile')>-1 }]
	},
    "843153" : {
		url: 'http://games.com',
		 ua: "FirefoxOS",
         /* detect <body class="... mobile touch"> */
		steps:[function(){return document.body.classList.contains('mobile') && document.body.classList.contains('touch') }]
	},
    "826353" : {
		url: 'http://itau.com.br',
		 ua: "FirefoxOS",
         /* /M is for Mobile in their URLs, it seems */
		steps:[function(){return location.pathname.indexOf('/M')===0}]
	},
    "828376" : {
		url: 'http://plotek.pl',
		 ua: "FirefoxOS",
         /* there is some server-side sniffing and some JS involved. This JS variable is defined by the backend browser sniffing code */
		steps:[function(){return location.hostname === 'm.plotek.pl' || window.gazeta_pl && gazeta_pl.mobileInfo && gazeta_pl.mobileInfo.isMobileDevice?true:false;}]
	},
    "826335" : {
		url: 'http://globo.com',
		 ua: "FirefoxOS",
         /* Globo redirects to m.globo from JS. The test below may run before or after redirect */
		steps:[function(){if(location.hostname.indexOf('m.globo.com')>-1)return true; try{ return unsafeWindow.glb.behavior.redirectToMobile.isMobile(navigator.userAgent);}catch(e){return 'test 826335 needs update, throws';}}]
	},
    '891032' : {
        url:'http://www.summitracing.com',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '821021' : {
        url:'http://www.evernote.com/m/',
        ua:'FirefoxOS',
        /* This site has two mobile versions, we want the fancier one for FxOS - the simpler one has a HandheldFriendly meta tag */
        steps:[ function(){return !hasHandheldFriendlyMeta();} ]
    },
    '843165' : {
        url:'http://virginatlantic.com',
        ua:'FirefoxOS',
        steps:[function(){ return mobileLinkOrScriptUrl('vaa-mobile') }]
    },
    '840896' : {
        url:'http://nextbuses.mobi',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '843176' : {
        url:'http://tylted.com',
        ua:'FirefoxOS',
        /* Site thinks FirefoxOS is a Wap browser.. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '843158' : {
        url:'http://www.starwoodhotels.com',
        ua:'FirefoxOS',
        /*Redirects to some text-only site on a different host*/
        steps:[function(){ return location.hostname.indexOf('starwoodhotels.com')>-1 }]
    },
    '828448' : {
        url:'http://www.petardas.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('petardashd')>-1;}]
    },
    '883863' : {
        url:'http://m.easyjet.com',
        ua:'FirefoxOS',
        /* EasyJet thinks FirefoxOS is a Wap browser.. */
        /* TODO: should have another test for this bug, checking that www. redirects to m. */
        steps:[noWapContentPlease],
        testType:'xhr'
    },
    '841715' : {
        url:'http://lufthansa.de',
        ua:'FirefoxAndroid',
        steps:[function(){return location.hostname.indexOf('mobile.lufthansa.com')>-1}]
    },
    '856662' : {
        url:'http://el-nacional.com',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('m.el-nacional.com')>-1;}]
    },
    '878262' : {
        url:'http://download.com',
        ua:'FirefoxOS',
        steps:[function(){ return location.hostname.indexOf('m.download.cnet.com')>-1 && hasViewportMeta(); }]
    },
    '766951' : {
        url:'http://cnn.com',
        ua:'FirefoxAndroid',
        /* CNN has two mobile sites, we'd prefer not to get the simplistic one on cnnmobile.com */
        steps:[function(){return location.hostname.indexOf('edition.cnn.com')>-1 && mobileLinkOrScriptUrl();}]
    },
    '805660' : {
        url:'http://bradesco.com.br',
        ua:'FirefoxOS',
        steps:[ /* both HTTP and JS-driven redirects kick in here. Let's look for the sniffing .js file - before it loads,
                there's no point in checking if it ran correctly */
            function(){ if(location.hostname.indexOf('celular') === -1 && !mobileLinkOrScriptUrl('Mobile2Detect.js'))return 'delay-and-retry'; },
            function(){return location.hostname.indexOf('bradescocelular.com.br')>-1;}
        ]
    },
    '828418' : {
        url:'http://bbva.es',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('bbva.mobi')>-1;}]
    },
    '841432' : {
        url:'http://m.cumhuriyet.com.tr',
        ua:'FirefoxAndroid',
        /* We'd rather not get a Content-Type: application/vnd.wap.xhtml+xml; charset=iso-8859-9 */
        steps:[noWapContentPlease],
        testType : 'xhr'
    },
    '857119' : {
        url: 'http://m.photobucket.com/images/?searchTerm=black+and+white',
        ua: 'FirefoxOS',
        /* we expect more than 10 images on a smartish phone.. */
		steps: [ function(){ return document.images.length>=10 } ]
    },
    '729556' : {
        url:'http://m.photobucket.com/',
        ua: 'FirefoxOS',
        /* this test is no longer directly testing the issue, because the page is redesigned.. */
        steps: [function(){ return document.body.id === 'mobilehomepage';}]
    },
    '759111' : {
        url:'http://www.live.com/',
        ua: 'FirefoxAndroid',
        /* URL of login page contains a redirect back to the /m/ URL for the mobile site */
        steps: [function(){ return location.href.indexOf('wreply=https:%2F%2Fmail.live.com%2Fm%2F')>-1 }]
    },
    '957853' : {
        url:'http://www.live.com/',
        ua: 'FirefoxOS',
        /* URL of login page contains a redirect back to the /m/ URL for the mobile site */
        steps: [function(){ return location.href.indexOf('wreply=https:%2F%2Fmail.live.com%2Fm%2F')>-1 }]
    },
    '890864' : {
        url:'http://www.mibebeyyo.com/',
        ua:'FirefoxOS',
        steps:[function(){ // site is now responsive! \o/
            if(!document.body)return 'delay-and-retry';
            return document.body.className.indexOf('homepage')>-1; // not sure if we should keep this test though..
        }
        ]
    },
    '888706' : {
        url:'http://m.plus.pl/',
        ua:'FirefoxOS',
        steps:[hasHandheldFriendlyMeta]
    },
    '888701' : {
        url:'http://m.cinecolombia.com/movil/cartelera/armenia?pelicula=1',
        ua:'FirefoxOS',
        /* the broken version has <table id="page">, the working version has <div id="page">*/
        steps:[function(){return document.getElementById('page').className === 'DIV'}]
    },
    '241688' : {
        url:'http://online.sainsburysbank.co.uk/',
        ua:'default',
        /* we expect a redirect to a correctly formatted https:// URL (problem is a redirect to https:\\ ...  */
        steps:[function(){ return location.protocol === 'https:'  && location.hostname === 'online.sainsburysbank.co.uk' }]
    },
    '827622' : {
        url:'http://bing.com',
        ua:'FirefoxOS',
        /* Bing is expected to redirect FirefoxOS browser to m.bing.com */
        steps:[function(){ return location.href.indexOf('m.bing.')>-1 }]
    },
    '896951' : {
        url:'http://www.orkut.com',
        ua:'FirefoxOS',
        /* Log in, then test */
        steps:[function(){tryLogin('Passwd', 'signIn')}, function(){return location.hostname.indexOf('m.orkut')>-1}]
    },
    '827869' : {
        url:'http://mail.google.com',
        ua:'FirefoxOS',
        /* Log in, then test */
        steps:[function(){tryLogin('Passwd', 'signIn')}, function(){return document.documentElement.className+document.body.className === ''}]
    },
    '826347' : {
        url:'http://www.msn.com',
        ua:'FirefoxOS',
        steps:[function(){return location.href.indexOf('mobile.msn.')>-1 || hasViewportMeta()}]
    },
    '896951' : {
        url:'http://www.spiegel.de',
        ua:'FirefoxOS',
        steps:[function(){return location.hostname.indexOf('ml.spiegel')>-1}]
    },
        "843143" : {
		url: 'http://foxnewsinsider.com',
		 ua: "FirefoxOS",
         /* site runs a nice, responsive Drupal design, so it doesn't need a mobile version :) */
		steps:[function(){return Drupal.settings.omega.layouts.order[0]==='narrow';}]
	}
};

/* Below are auto-generated tests. They will be merged into bugdata, but
if both objects have test data for the same bug, the existing one in bugdata is kept
(presuming that is a hand-written, manually vetted one..)*/
var automated_tests={
    "843129" : {
    	url: 'http://11870.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "828390" : {
		url: 'http://20minutos.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.20minutos.es")>-1}]
	},
	"804715" : {
		url: 'http://163.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"866577" : {
		url: 'http://3g.qq.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("info.3g.qq.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826502" : {
		url: 'http://4shared.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826344" : {
		url: 'http://abril.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"805164" : {
		url: 'http://accounts.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828412" : {
		url: 'http://amazon.co.uk',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828388" : {
		url: 'http://amazon.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828399" : {
		url: 'http://antena3.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.antena3.com")>-1 && hasViewportMeta()}]
	},
	"730237" : {
		url: 'http://apple.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878220" : {
		url: 'http://aprod.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843149" : {
		url: 'http://arstechnica.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878222" : {
		url: 'http://arukereso.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.arukereso.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878630" : {
		url: 'http://ask.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843119" : {
		url: 'http://askthebuilder.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827674" : {
		url: 'http://avianca.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.avianca.com")>-1}]
	},
	"828437" : {
		url: 'http://avn.info.ve',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878651" : {
		url: 'http://b92.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"826711" : {
		url: 'http://bb.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bb.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878226" : {
		url: 'http://bet365.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.bet365.com")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"939035" : {
		url: 'http://beyond.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878258" : {
		url: 'http://blackhatteam.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878228" : {
		url: 'http://blikk.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.blikk.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827627" : {
		url: 'http://bol.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bol.uol.com.br")>-1 && hasViewportMeta()}]
	},
	"828420" : {
		url: 'http://booking.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884290" : {
		url: 'http://broadway.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878634" : {
		url: 'http://buenastareas.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828445" : {
		url: 'http://bumeran.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bumeran.com.ve")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"815442" : {
		url: 'http://carsensor.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878260" : {
		url: 'http://cdm.me',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cdm.me")>-1 && hasViewportMeta()}]
	},
	"828358" : {
		url: 'http://ceneo.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ceneo.pl")>-1 && hasViewportMeta()}]
	},
	"843168" : {
		url: 'http://cheaptickets.com',
		 ua: "FirefoxOS",
         /* as of July 2014, only the mobile site used <header> */
		steps:[function(){
            if(document.readyState != 'complete') return 'delay-and-retry';
            return document.getElementsByClassName('siteMenuButton').length != 0;
        }]
	},
	"843197" : {
		url: 'http://cheezburger.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843186" : {
		url: 'http://chevrolet.com',
		 ua: "FirefoxOS1.1",
		steps:[function(){return location.hostname.indexOf("m.chevrolet.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843151" : {
		url: 'http://citibank.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878230" : {
		url: 'http://citromail.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.citromail.hu")>-1 && hasViewportMeta()}]
	},
	"826949" : {
		url: 'http://clickjogos.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827631" : {
		url: 'http://climatempo.com.br',
		 ua: "FirefoxOS",
		steps:[function(){},function(){return location.hostname.indexOf("m.climatempo.com.br")>-1 }]
	},
	"784450" : {
		url: 'http://cnet.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("cnet.com")>-1 && document.cookie.indexOf('fly_device=mobile')>-1;}]
	},
	"843132" : {
		url: 'http://comunio.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.comunio.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843139" : {
		url: 'http://consumersearch.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828380" : {
		url: 'http://deser.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.deser.pl")>-1 && hasViewportMeta()}]
	},
    "843136" : {
		url: 'http://deviantart.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887751" : {
		url: 'http://di.com.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"815374" : {
		url: 'http://directv.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827676" : {
		url: 'http://dropbox.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826958" : {
		url: 'http://ebay.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ebay.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828386" : {
		url: 'http://ebay.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ebay.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843146" : {
		url: 'http://edmunds.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843160" : {
		url: 'http://ehow.com',
		 ua: "FirefoxOS",
		steps:[function(){return document.getElementsByClassName('PageSlider').length>0;}]
	},
	"828397" : {
		url: 'http://elconfidencial.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827664" : {
		url: 'http://elespectador.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() && window.device === 'mobile'}]
	},
	"887782" : {
		url: 'http://elimpulso.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827670" : {
		url: 'http://elpais.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.elpais.com.co")>-1}]
	},
	"827670" : {
		url: 'http://elpais.com.co/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.elpais.com.co")>-1}]
	},
	"878637" : {
		url: 'http://eluniversal.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.eluniversal.com.mx")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843109" : {
		url: 'http://enfemenino.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.enfemenino.com")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"798525" : {
		url: 'http://engadget.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878630" : {
		url: 'http://es.ask.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843126" : {
		url: 'http://es.playstation.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.es.playstation.com")>-1 && hasViewportMeta()}]
	},
	"890858" : {
		url: 'http://es.qdq.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://es.wikia.com/Wikia',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843170" : {
		url: 'http://etsy.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"806171" : {
		url: 'http://everything.me',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"815913" : {
		url: 'http://facebook.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"759599" : {
		url: 'http://firstlineofcode.blogspot.co.nz/2012/05/what-firefox-users-wants.html',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878638" : {
		url: 'http://flickr.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.flickr.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843141" : {
		url: 'http://foodily.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828403" : {
		url: 'http://fotocasa.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.fotocasa.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828354" : {
		url: 'http://gazeta.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.gazeta.pl")>-1 && hasViewportMeta()}]
	},
	"855450" : {
		url: 'http://globovision.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"804744" : {
		url: 'http://google.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804723" : {
		url: 'http://google.ro',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827628" : {
		url: 'http://groupon.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.groupon.com.br")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"866577" : {
		url: 'http://h5.qq.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("info.3g.qq.com")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878264" : {
		url: 'http://haber.ba',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.haber.ba")>-1 && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"827633" : {
		url: 'http://hao123.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.hao123.com")>-1 && hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://harrypotter.wikia.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
/*	"878640" : {
		url: 'http://hootsuite.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},*/
	"878234" : {
		url: 'http://hvg.hu',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878266" : {
		url: 'http://i-dizajn.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884852" : {
		url: 'http://icanhas.cheezburger.com',
		 ua: "FirefoxOS",
		steps:[function(){return document.getElementById('js-globalnav').className.indexOf('is-fixed')==-1;}]
	},
	"828392" : {
		url: 'http://infojobs.net',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828371" : {
		url: 'http://ingbank.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("lajt.ingbank.pl")>-1 && hasViewportMeta()}]
	},
	"828401" : {
		url: 'http://ingdirect.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ingdirect.es")>-1 && hasViewportMeta()}]
	},
	"843200" : {
		url: 'http://iphonejuegosgratis.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878236" : {
		url: 'http://jofogas.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.jofogas.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878268" : {
		url: 'http://jutarnji.hr',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"878238" : {
		url: 'http://koponyeg.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.koponyeg.hu")>-1 && hasViewportMeta()}]
	},
	"878271" : {
		url: 'http://kurir-info.rs',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878240" : {
		url: 'http://kuruc.info',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.kuruc.info")>-1}]
	},
	"827576" : {
		url: 'http://lancenet.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.lancenet.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828441" : {
		url: 'http://laverdad.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826517" : {
		url: 'http://letras.mus.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.letras.mus.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878273" : {
		url: 'http://livescore.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828416" : {
		url: 'http://loteriasyapuestas.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.loteriasyapuestas.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828416" : {
		url: 'http://loteriasyapuestas.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.loteriasyapuestas.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"816500" : {
		url: 'http://m.assuta.co.il',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"888207" : {
		url: 'http://m.atrapalo.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.atrapalo.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888209" : {
		url: 'http://m.bumeran.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.bumeran.com.co")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888701" : {
		url: 'http://m.cinecolombia.com/movil/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && hasMobileOptimizedMeta() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"876870" : {
		url: 'http://m.danner.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"755100" : {
		url: 'http://m.dictionary.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884240" : {
		url: 'http://m.europapress.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.europapress.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"886121" : {
		url: 'http://m.fool.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://m.google.com/plus',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"790193" : {
		url: 'http://m.inc.com',
		 ua: "FirefoxAndroid",
		steps:[function(){return hasViewportMeta()}]
	},
	"884264" : {
		url: 'http://m.nydailynews.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"887739" : {
		url: 'http://m.ofeminin.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.ofeminin.pl")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"729556" : {
		url: 'http://m.photobucket.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"888706" : {
		url: 'http://m.plus.pl/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.plus.pl")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"842184" : {
		url: 'http://m.thestar.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827626" : {
		url: 'http://magazineluiza.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.magazineluiza.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://mail.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'http://mail.google.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"804710" : {
		url: 'http://map.wap.soso.com/x/?icfa=1311045&sid=AeKw29zcAD3dkE1EYFFeUuQ6&g_ut=3&biz=newHome',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://maps.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827678" : {
		url: 'http://marca.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843124" : {
		url: 'http://maruccisports.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827661" : {
		url: 'http://mercadolibre.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878642" : {
		url: 'http://mercadolibre.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828425" : {
		url: 'http://mercadolibre.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826342" : {
		url: 'http://mercadolivre.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884863" : {
		url: 'http://mobile.reuters.com/',
		 ua: "FirefoxOS",
		steps:[function(){return document.getElementsByTagName('nav').length>0;  mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta()}],
        title: "mobile.reuters.com sends a low-fi mobile version to Firefox OS"
	},
	"878275" : {
		url: 'http://mondo.rs',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() }]
	},
	"828369" : {
		url: 'http://money.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.money.pl")>-1 && hasViewportMeta()}]
	},
	"843112" : {
		url: 'http://movil.bankinter.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"826347" : {
		url: 'http://msn.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("t.no.msn.com")>-1 && hasViewportMeta()}]
	},
	"887684" : {
		url: 'http://muyahorro.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878277" : {
		url: 'http://naslovi.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843154" : {
		url: 'http://nba.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mi.nba.com")>-1  && hasViewportMeta()}]
	},
	"878242" : {
		url: 'http://nemzetisport.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.nemzetisport.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878643" : {
		url: 'http://netflix.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("secure.netflix.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"887294" : {
		url: 'http://netvibes.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.netvibes.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843134" : {
		url: 'http://news.google.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"891873" : {
		url: 'http://news.google.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"" : {
		url: 'http://nfl.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828364" : {
		url: 'http://nk.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.nk.pl")>-1 && hasViewportMeta()}]
	},
	"878244" : {
		url: 'http://nlcafe.hu',
		 ua: "FirefoxOS",
		steps:[function(){return document.body.className.indexOf('device-mobile')>-1}]
	},
	"886125" : {
		url: 'http://nme.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826715" : {
		url: 'http://noticias.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828356" : {
		url: 'http://o2.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"826720" : {
		url: 'http://olx.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.br")>-1 && hasViewportMeta()}]
	},
	"827672" : {
		url: 'http://olx.com.co',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.co")>-1 && hasViewportMeta()}]
	},
	"968422" : {
		url: 'http://olx.com.mx',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.mx")>-1 && hasViewportMeta()}]
	},
	"828433" : {
		url: 'http://olx.com.ve',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.olx.com.ve")>-1 && hasViewportMeta()}]
	},
	"828406" : {
		url: 'http://orange.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.orange.es")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843156" : {
		url: 'http://orbitz.com',
		 ua: "FirefoxOS",
		steps:[function(){ // <meta content="mobile" name="DCSext.deviceview"></meta>
            return document.querySelector('meta[content="mobile"]') !== null;
        }]
	},
	"828414" : {
		url: 'http://paginasamarillas.es',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827625" : {
		url: 'http://pagseguro.uol.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.pagseguro.uol.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"729556" : {
		url: 'http://photobucket.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878242" : {
		url: 'http://port.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878249" : {
		url: 'http://portfolio.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.portfolio.hu")>-1 && hasViewportMeta()}]
	},
	"878251" : {
		url: 'http://profession.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828422" : {
		url: 'http://publico.es',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.publico.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828422" : {
		url: 'http://publico.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.publico.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"826510" : {
		url: 'http://r7.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.r7.com")>-1 && hasViewportMeta()}]
	},
	"725202" : {
		url: 'http://reddit.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878653" : {
		url: 'http://redstarbelgrade.info',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878653" : {
		url: 'http://redstarbelgrade.info/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828435" : {
		url: 'http://rincondelvago.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"827668" : {
		url: 'http://scribd.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"884880" : {
		url: 'http://skinnyvscurvy.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"843181" : {
		url: 'http://slashgear.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827666" : {
		url: 'http://slideshare.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878284" : {
		url: 'http://softonic.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.softonic.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"804710" : {
		url: 'http://wap.sogou.com/pic/download.jsp?keyword=panda&index=1&v=5&amp;uID=7I-vsrDhj-2b7ngb#!id=2527ddb06ff1128f-27dc0329ebc9a017-129c8f03e0c1c95fe2e7fb649375c84f&index=1',
		 ua: "FirefoxAndroid",
		steps:[function(){
            var oldMarkup = document.getElementById('imglist').innerHTML;
            document.getElementById('next-a').click();
            var passed = oldMarkup != document.getElementById('imglist').innerHTML;
            return passed;}]
	},
	"828360" : {
		url: 'http://sport.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.sport.pl")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828408" : {
		url: 'http://stackoverflow.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"734359" : {
		url: 'http://stumbleupon.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828374" : {
		url: 'http://tablica.pl',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"827623" : {
		url: 'http://tam.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"884895" : {
		url: 'http://theawesomer.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843183" : {
		url: 'http://thechive.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843174" : {
		url: 'http://thinkgeek.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804726" : {
		url: 'http://tmall.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.tmall.com")>-1 && hasViewportMeta()}]
	},
	"843121" : {
		url: 'http://tor.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828362" : {
		url: 'http://tvn24.pl',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"709241" : {
		url: 'https://mobile.twitter.com',
		 ua: "FirefoxAndroid",
		steps:[function(){},function(){return document.getElementById('launchdata') !== null}]
	},
	"843178" : {
		url: 'http://txt2nite.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"878649" : {
		url: 'http://univision.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("movil.univision.com")>-1 && hasViewportMeta()}]
	},
	"843162" : {
		url: 'http://urbanspoon.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827630" : {
		url: 'http://vagalume.com.br',
		 ua: "FirefoxOS",
		steps:[
            function(){},
            function(){return location.hostname.indexOf("m.vagalume.com.br")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}
        ]
	},
	"878253" : {
		url: 'http://vatera.hu',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vatera.hu")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878655" : {
		url: 'http://vesti-online.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vesti-online.com")>-1 && hasViewportMeta()}]
	},
	"828394" : {
		url: 'http://vimeo.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"887856" : {
		url: 'http://wap.ratp.fr',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"876311" : {
		url: 'http://weather.com',
		 ua: "FirefoxAndroid",
		steps:[function(){return location.hostname.indexOf("m.weather.com")>-1 }]
	},
	"827573" : {
		url: 'http://webmotors.com.br',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"888203" : {
		url: 'http://wikia.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"799881" : {
		url: 'http://wikipedia.org',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"828351" : {
		url: 'http://wp.pl',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wp.pl")>-1 && hasHandheldFriendlyMeta() && hasViewportMeta()}]
	},
	"899541" : {
		url: 'http://www.blackberry.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"828420" : {
		url: 'http://www.booking.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"843132" : {
		url: 'http://www.comunio.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.comunio.es")>-1 && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"848854" : {
		url: 'http://www.deadline.com/',
		 ua: "FirefoxOS",
		steps:[function(){}, function(){return location.hostname === 'm.deadline.com'}]
	},
	"828403" : {
		url: 'http://www.fotocasa.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.fotocasa.es")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},/* This problem isn't well enough understood to test at the moment..
	"884280" : {
		url: 'http://www.giantbomb.com/videos/quick-look-the-last-of-us/2300-7467/',
		 ua: "FirefoxAndroid",
		steps:[function(){return hasViewportMeta()  && document.getElementsByTagName('video').length>0}]
	},*/
	"826335" : {
		url: 'http://www.globo.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'http://www.google.com/finance?q=NASDAQ:GOOG',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828401" : {
		url: 'http://www.ingdirect.es/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"826348" : {
		url: 'http://www.linkedin.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("touch.www.linkedin.com")>-1 && hasViewportMeta()}]
	},
	"826342" : {
		url: 'http://www.mercadolivre.com.br/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888708" : {
		url: 'http://www.msz.gov.pl/en/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"823604" : {
		url: 'http://www.nextbus.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843137" : {
		url: 'http://www.nytimes.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"815823" : {
		url: 'http://www.ocn.ne.jp',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"828406" : {
		url: 'http://www.orange.es/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.orange.es")>-1 && hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"808572" : {
		url: 'http://www.pressly.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"890842" : {
		url: 'http://www.rumbo.es/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878649" : {
		url: 'http://www.univision.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("movil.univision.com")>-1 && hasViewportMeta()}]
	},
	"843162" : {
		url: 'http://www.urbanspoon.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878655" : {
		url: 'http://www.vesti-online.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.vesti-online.com")>-1 && hasViewportMeta()}]
	},
	/*"843116" : {
		url: 'http://wwwhatsnew.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},*/
    /*Both Wyborcza sites do a very complicated "client-side sniffing sets cookie, server-side logic redirects based on cookie" thing..
     All the sniffing takes place on a /0,0.html URL so if we're still there it's too early to do the actual test..
    */
	"828366" : {
		url: 'http://wyborcza.biz/biznes/0,0.html',
		 ua: "FirefoxOS",
		steps:[
            function(){ if(location.pathname === '/' || (location.hostname.indexOf('m.') === -1 && location.pathname.indexOf('/0,0') === 0))return 'delay-and-retry' },
            function(){if(location.hostname.indexOf("m.wyborcza.")>-1)return true;try{return 'isMobile '+ window.PianoMedia.isMobile()}catch(e){return 'delay-and-retry'} }
        ]
    },
    "828378" : {
        url: 'http://wyborcza.pl',
         ua: "FirefoxOS",
        steps:[
            function(){ if(location.pathname === '/' || (location.hostname.indexOf('m.') === -1 && location.pathname.indexOf('/0,0') === 0))return 'delay-and-retry' },
            function(){if(location.hostname.indexOf("m.wyborcza.")>-1)return true;try{return 'isMobile '+ window.PianoMedia.isMobile()}catch(e){return 'delay-and-retry'} }
        ]
	},
	"878286" : {
		url: 'http://yandex.ru',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"799884" : {
		url: 'http://yelp.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"890873" : {
		url: 'http://yfrog.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"827636" : {
		url: 'http://youtube.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843172" : {
		url: 'http://zimbio.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.zimbio.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878640" : {
		url: 'https://hootsuite.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"815913" : {
		url: 'https://m.facebook.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"843112" : {
		url: 'https://movil.bankinter.es/',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"805164" : {
		url: 'https://plus.google.com/?hl=es&partnerid=gplp0',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
	"821021" : {
		url: 'https://www.evernote.com/m/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/}]
	},
	"805164" : {
		url: 'https://www.google.com/m?search?ie=UTF-8&oe=utf-8&q=test',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
    "749583" : {
		url: 'http://asana.com/product',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"798780" : {
		url: 'http://m.aukro.cz/',
		 ua: "FirefoxOS",
		steps:[function(){return hasMobileOptimizedMeta() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"921556" : {
		url: 'http://taobao.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.taobao.com")>-1 && hasViewportMeta()}]
	},
	"804716" : {
		url: 'http://www.reuters.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.reuters.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}],
        title: "reuters.com serves Desktop Content to FirefoxOS"
	},
	"743696" : {
		url: 'http://m.comcast.net',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"753985" : {
		url: 'http://www.gilt.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.gilt.com")>-1 && hasViewportMeta()}]
	},
    "901569" : {
		url: 'http://ajw.asahi.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"795088" : {
		url: 'http://m.mapy.cz/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"762975" : {
		url: 'http://www.walmart.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("mobile.walmart.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"899748" : {
		url: 'http://www.setbeat.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.setbeat.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"717516" : {
		url: 'http://m.porsche.com/usa/models/cayenne/cayenne-s/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() /*(regression test, expected to pass)*/ && hasViewportMeta()}]
	},
	"754404" : {
		url: 'http://www.starbucks.com/store-locator',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "966184" : {
        url: 'http://www.national-lottery.co.uk/',
         ua: "FirefoxOS",
        steps:[function(){return location.hostname.indexOf("m.national-lottery.co.uk")>-1 && hasViewportMeta()}]
    },
	"785374" : {
		url: 'http://www.national-lottery.co.uk/',
		 ua: "FirefoxAndroid",
		steps:[function(){return location.hostname.indexOf("m.national-lottery.co.uk")>-1 || location.pathname.indexOf('android')>-1}]
	},
	"791520" : {
		url: 'http://www.letschat.pro/mobile/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() /*(regression test, expected to pass)*/ && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"878132" : {
		url: 'http://www.foursquare.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"867403" : {
		url: 'http://www.yahoo.com/?m=sp',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"804709" : {
		url: 'http://stumbleupon.com',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"804720" : {
		url: 'http://scribd.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "757247" : {
		url: 'http://m.wat.tv',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.wat.tv")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"900617" : {
		url: 'http://www.despegar.com.ve/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.despegar.com.ve")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "878232" : {
		url: 'http://hazipatika.com',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.hazipatika.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"878246" : {
		url: 'http://port.hu',
		 ua: "FirefoxOS",
		steps:[function(){return hasViewportMeta()}]
	},
    "876357" : {
        url: 'http://www.economist.com',
         ua: "FirefoxAndroid",
        steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}],
        title: 'Economist not serving mobile optimized site to Firefox for Android'
    },
    "1001451" : {
		url: 'http://economist.com',
		 ua: "FirefoxOS",
		steps:[
            function(){return document.body.className.indexOf('econmobile')>-1;}
        ]
	},
    "804729" : {
		url: 'http://harrypotter.wikia.com/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "968073" : {
        url: 'http://overstock.com',
         ua: "FirefoxOS",
        steps:[function(){return hasViewportMeta()}]
    },
    "759729" : {
		url: 'http://overstock.com',
		 ua: "FirefoxAndroid",
		steps:[function(){return hasViewportMeta()}]
	},
    "798770" : {
		url: 'http://www.sport.cz/fotbal/evropske-ligy/clanek/435450-video',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.sport.cz")>-1 && hasViewportMeta()}]
	},
    "935469" : {
		url: 'http://www.veoh.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"935475" : {
		url: 'http://www.metacafe.com/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"935913" : {
		url: 'http://desktopvideo.about.com/od/watchingonlinevideo/a/watchonline.htm',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
	"888733" : {
		url: 'http://www.crunchyroll.com/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("www.crunchyroll.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
	"936433" : {
		url: 'http://www.readingrockets.org/shows/',
		 ua: "FirefoxOS",
		steps:[function(){return hasHandheldFriendlyMeta() && hasMobileOptimizedMeta() && hasViewportMeta()}]
	},
	"936467" : {
		url: 'http://www.news10.net/video/liveonline/default.aspx',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl()}]
	},
	"936474" : {
		url: 'http://tv.com',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta()}]
	},
    "935898" : {
		url: 'http://www.usopen.org/',
		 ua: "FirefoxOS",
		steps:[function(){return mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}],
        "title":"usopen.org sends desktop content to FirefoxOS"
	},
	"935899" : {
		url: 'http://www.cwtv.com/cw-video/',
		 ua: "FirefoxOS",
		steps:[function(){return location.hostname.indexOf("m.cwtv.com")>-1 && mobileLinkOrScriptUrl() && hasViewportMeta() /*(regression test, expected to pass)*/}]
	},
    "931919": {
        "url": "http://redplanet.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.redplanet.gr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "redplanet.gr doesn't redirect to mobile site on Firefox OS"
    },
    "931929": {
        "url": "http://aegeanair.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.aegeanair.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "aegeanair.com doesn't redirect to mobile site on Firefox OS"
    },
    "957457": {
        "url": "http://mp3.3g.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "mp3.3g.cn sends WAP page"
    },
    "932007": {
        "url": "http://www.techgear.gr",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "techgear.gr doesn't show mobile design on Firefox OS"
    },
    "931901": {
        "url": "http://www.pathfinder.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "i.pathfinder.gr";}
        ],
        "ua": "FirefoxOS"
    },
    "957440": {
        "url": "http://sina.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr"
    },
    "958495": {
        "url": "https://www.tripit.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS"
    },
    "934120": {
        "url": "http://www.mediamarkt.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mediamarkt.gr";}
        ],
        "ua": "FirefoxOS",
        "title": "mediamarkt.gr doesn't redirect to mobile site on Firefox OS"
    },
    "944466": {
        "url": "http://www.tokyoartbeat.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "tokyoartbeat.com sends desktop content to Firefox OS"
    },
    "960825": {
        "url": "http://weblio.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "weblio.jp sends desktop site to Firefox OS"
    },
    "940341": {
        "url": "http://www.mylifetime.com/video",
        "steps": [
            function(){
                if(document.readyState != 'complete') return 'delay-and-retry';
                return document.getElementById('player0.player') != null;
            }
        ],
        "ua": "FirefoxOS",
        "title": "mylifetime.com doesn't create video player on Firefox OS"
    },
    "932012": {
        "url": "http://www.airtickets.gr",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "airtickets.gr doesn't redirect to mobile site on Firefox OS"
    },
    "958708": {
        "url": "http://m.mlb.com/video",
        "steps": [
            function(){return hasVideoTags() && document.getElementsByTagName('video')[0].outerHTML;}
        ],
        "ua": "FirefoxOS",
        "title": "m.mlb.com - issues with video playback in Fennec and B2G"
    },
    "940325": {
        "url": "http://www.hulu.com",
        /* Note: locales matter for this site.. Doesn't serve videos anywhere.. */
        "steps": [
            function(){return hasVideoTags() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "hulu.com: Firefox OS gets desktop version"
    },
    "957476": {
        "url": "http://wap.3ggpw.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wap.3ggpw.cn sends WAP page"
    },
    "960826": {
        "url": "http://gnavi.co.jp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.gnavi.co.jp";}
        ],
        "ua": "FirefoxOS",
        "title": "gnavi.co.jp sends desktop site to Firefox OS"
    },
    "946380": {
        "url": "http://www.orange.fr/",
        "steps": [
            function(){return location.hostname.indexOf('mobile')>-1;}
        ],
        "ua": "FirefoxOS",
        "title": "orange.fr serves desktop content to Firefox for Android and Firefox OS"
    },
    "944782": {
        "url": "http://www.weather.com/",
        "steps": [
            function(){return location.hostname === "mw.weather.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "weather.com sends desktop content to Firefox OS"
    },
    "946737": {
        "url": "https://medium.com/cool-code-pal/cf72b588b1b",
        "steps": [
            function(){return typeof window.PLOVR_MODULE_INFO != 'undefined';}
        ],
        "ua": "FirefoxAndroid",
        "title": "Medium.com doesn't display comment callouts in Fennec"
    },
    "957043": {
        "url": "http://mixi.jp/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "mixi.jp sends the desktop version for Firefox on Mobile"
    },
    "944741": {
        "url": "http://tiff.net/",
        "steps": [
            function(){return document.getElementById('mobile__menu')!=null;}
        ],
        "ua": "FirefoxOS",
        "title": "tiff.net delivers desktop content to firefox OS"
    },
    "899541": {
        "url": "http://www.blackberry.com/",
        "steps": [
            function(){return location.hostname === "m.blackberry.com";}
        ],
        "ua": "FirefoxOS",
        "title": "blackberry.com main site does not recognize Firefox OS"
    },
    "1001443": {
        "url": "http://www.instructables.com/",
        "steps": [
            function(){return location.hostname === "m.instructables.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "instructables.com sends desktop site to Firefox OS"
    },
    "942739": {
        "url": "http://labanquepostale.mobi",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "labanquepostale.mobi sends invalid mobile content to FirefoxOS"
    },
    "784463": {
        "url": "https://www.bankofamerica.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Clicking Mobile Banking Sign In on BOA site redirects to non mobile site"
    },
    "959106": {
        "url": "http://hexin.cn",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "hexin.cn";}
        ],
        "ua": "FirefoxOS",
        "title": "hexin.cn sends Firefox OS simplified page"
    },
    "959117": {
        "url": "http://m.sogou.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "m.sogou.com sends simplified site to Firefox OS"
    },
    "959125": {
        "url": "http://m.hao123.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "m.hao123.com sends simplified site to Firefox OS"
    },
    "958924": {
        "url": "http://my.yahoo.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "my.yahoo doesn't serve tier1 on Firefox OS and Firefox Android"
    },
    "760559": {
        "url": "http://www.google.com/flights",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Google Flight Search: Offered Desktop over Mobile content"
    },
    "959141": {
        "url": "http://www.lvmama.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.lvmama.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.lvmama.com sends desktop site to Firefox OS"
    },
    "934857": {
        "url": "http://www.txu.com/",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "TXU Energy website sends Firefox for Android a file with a WAP mime type"
    },
    "926475": {
        "url": "http://www.peruenvideos.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "peruenvideos.com doesn't display correctly in Gaia browser"
    },
    "945963": {
        "url": "http://tieba.baidu.com/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxAndroid",
        "title": "tieba.baidu.com serves simplified mobile content to Firefox Android"
    },
    "959475": {
        "url": "http://yicha.cn",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "page.yicha.cn";}
        ],
        "ua": "FirefoxOS",
        "title": "yicha.cn sends desktop site to Firefox OS"
    },
    "805664": {
        "url": "http://www.santander.com.br/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.santander.com.br";}
        ],
        "ua": "FirefoxOS",
        "title": "Redirect loop prevents access to Santander Brasil (Brazilian bank)"
    },
    "945954": {
        "url": "http://map.baidu.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "map.baidu.com serves a broken mobile site to Firefox Android"
    },
    "733920": {
        "url": "https://launchpad.37signals.com/basecamp/signin",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Basecamp renders a desktop site for fennec, where as in stock browser, a mobile-optimized app is rendered"
    },
    "942989": {
        "url": "http://www.lectio.dk/lectio/531/SkemaNy.aspx?type=elev&elevid=4541970184",
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Lectio website does not work in Firefox for Android phone"
    },
    "959472": {
        "url": "http://m.joy.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "m.joy.cn / 3g.joy.cn sends WAP site to Firefox OS"
    },
    "944808": {
        "url": "http://www.bhphotovideo.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bhphotovideo.com serves lo-fi mobile site to Firefox for Android and desktop site to Firefox OS"
    },
    "828380": {
        "url": "http://deser.pl/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.deser.pl";}
        ],
        "ua": "FirefoxOS",
        "title": "deser.pl doesn't recognize B2G UA as mobile"
    },
    "920466": {
        "url": "http://news.google.com/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Google news top menu hidden, due to display:-webkit-box style"
    },
    "942247": {
        "url": "http://kennedyandoswald.com",
        "steps": [
            function(){if(document.querySelectorAll('video,object').length===0) return 'delay-and-retry'; return hasVideoTags();}
        ],
        "ua": "FirefoxAndroid",
        "title": "NatGeo Kennedy promo site blocks Firefox for Android for not having Flash"
    },
    "932846": {
        "url": "http://rediff.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rediff.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "rediff.com isn't redirecting to mobile site on Firefox OS"
    },
    "957505": {
        "url": "http://vip.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.vip.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "vip.com sends Firefox OS to Desktop site"
    },
    "957500": {
        "url": "http://www.livedoor.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "livedoor.com / blog.livedoor.com delivers desktop content to Firefox OS"
    },
    "932892": {
        "url": "http://www.bhaskar.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bhaskar.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bhaskar.com isn't redirecting to mobile site on Firefox OS"
    },
    "957484": {
        "url": "http://wenwen.wap.soso.com/index.jsp",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wenwen.wap.soso.com sends WAP page"
    },
    "949284": {
        "url": "https://m.midflorida.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.midflorida.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "(Midflorida.com) - Sign-in input not visible in Gecko due to WebKit CSS styling"
    },
    "957482": {
        "url": "http://wap.ifeng.com/news/newsi?mid=25JIIr",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wap.ifeng.com sends WAP page"
    },
    "960018": {
        "url": "http://takealot.com",
        "steps": [
            function(){return location.hostname === "m.takealot.com" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "takealot.com sends desktop site to Firefox OS"
    },
    "932876": {
        "url": "http://www.oneindia.in/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.oneindia.in";}
        ],
        "ua": "FirefoxOS",
        "title": "oneindia.in  isn't redirecting to mobile site"
    },
    "957453": {
        "url": "http://wap.lexun.com",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wap.lexun.com sends WAP page"
    },
    "957478": {
        "url": "http://3g.163.com/news/special/136/junshiindex.html",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "3g.163.com sends WAP page"
    },
    "957454": {
        "url": "http://tx.com.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "tx.com.cn sends WAP page"
    },
    "957474": {
        "url": "http://lady.3g.net.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "lady.3g.net.cn sends WAP page"
    },
    "957459": {
        "url": "http://novel.iask.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "novel.iask.cn sends WAP page"
    },
    "939035": {
        "url": "http://www.beyond.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "beyond.com sends desktop content to FirefoxOS"
    },
    "957472": {
        "url": "http://3g.pp.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "3g.pp.cn sends WAP page"
    },
    "957496": {
        "url": "http://wap.ireader.com/",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wap.ireader.com sends WAP page"
    },
    "754752": {
        "url": "http://books.google.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Google Books - Desktop site renders on fennec native, not mobile site"
    },
    "932921": {
        "url": "http://www.airtel.in/forme/home",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.airtel.in";}
        ],
        "ua": "FirefoxOS",
        "title": "airtel.in isn't redirecting to mobile site on Firefox OS"
    },
    "959478": {
        "url": "http://wap.yuanlai.com/index.do;s=mpc8pilwzfnzhz1wocjj?uid=null&channelid=144&subchannelid=",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "wap.yuanlai.com";}
        ],
        "ua": "FirefoxOS",
        "title": "wap.yuanlai.com sends desktop site to Firefox OS"
    },
    "932901": {
        "url": "http://m.homeshop18.com/splash.html#/home.html",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.homeshop18.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.homeshop18.com redirects to Desktop site on Firefox OS"
    },
    "932907": {
        "url": "http://www.makemytrip.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.makemytrip.com";}
        ],
        "ua": "FirefoxOS",
        "title": "makemytrip.com isn't redirecting to mobile site on Firefox OS"
    },
    "959489": {
        "url": "http://zhtao.cn",
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "zhtao.cn sends simplified site to Firefox OS"
    },
    "957444": {
        "url": "http://news.3g.cn",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "news.3g.cn sends WAP page"
    },
   /* "957462": {
        "url": "http://kong.net",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "kong.net sends WAP page"
    }, */
    "957465": {
        "url": "http://wap.51.com",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "wap.51.com sends WAP page"
    },
    "957464": {
        "url": "http://youyuan.com/",
        "steps": [
            /* function(){return location.hostname === 'touch.youyuan.com';} */
            noWapContentPlease
        ],
        "ua": "FirefoxOS1.4",
        "testType": "xhr",
        "title": "youyuan.com sends WAP page"
    },
    "959486": {
        "url": "http://voice.meiriyiwen.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "meiriyiwen.com sends desktop site to Firefox OS"
    },
    "960032": {
        "url": "http://wikihow.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.wikihow.com" ;}
        ],
        "ua": "FirefoxOS",
        "title": "wikihow.com sends desktop site to Firefox OS"
    },
    "960033": {
        "url": "http://webmail.co.za",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.webmail.co.za" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "webmail.co.za sends desktop site to Firefox OS"
    },
    "960031": {
        "url": "http://pnet.co.za",
        "steps": [
            function(){return location.hostname === "m.pnet.co.za";}
        ],
        "ua": "FirefoxOS",
        "title": "pnet.co.za does not offer mobile site to Firefox OS"
    },
    "934124": {
        "url": "http://wap.abril.com.br",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "wap.abril.com.br HTML elements not rendered properly"
    },
    "960034": {
        "url": "http://safarinow.com",
        "steps": [
            function(){return hasViewportMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "safarinow.com sends desktop site to Firefox OS"
    },
    "934126": {
        "url": "http://itau.com.br",
        "steps": [
            function(){return location.hostname === "ww70.itau.com.br";}
        ],
        "ua": "FirefoxOS",
        "title": "itau.com.br tells me to download their app, if I touch this button I got redirected to their mobile page"
    },
    "934128": {
        "url": "http://www.americanas.com.br",
        "steps": [
            function(){return location.hostname === "m.americanas.com.br" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.americanas.com.br doesn't open the mobile site on FirefoxOS"
    },
    "934105": {
        "url": "http://www.macuser.gr",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "macuser.gr doesn't show mobile design on Firefox OS"
    },
    "957970": {
        "url": "http://mt.hupu.com/nba",
        "steps": [
            function(){return location.hostname === "mt.hupu.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "mt.hupu.com/nba redirects to simplified mobile site"
    },
    "900619": {
        "url": "http://lapatilla.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "lapatilla.com doesn't recognize B2G UA as mobile"
    },
    "957819": {
        "url": "http://m.qunar.com",
        "steps": [
            function(){return location.hostname === "touch.qunar.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.qunar.com does not automatically redirect to touch.qunar.com"
    },
    "957602": {
        "url": "http://m.guahao.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.guahao.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.guahao.com sends Firefox OS to desktop site"
    },
    "960410": {
        "url": "http://dmm.co.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "dmm.co.jp sends desktop site to Firefox OS"
    },
    "822793": {
        "url": "http://www.nzherald.co.nz/",
        "steps": [
            function(){return location.hostname === "m.nzherald.co.nz" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "nzherald.co.nz should show the mobile version of the web page for b2g/gaia"
    },
    "933112": {
        "url": "http://www.yebhi.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.yebhi.com";}
        ],
        "ua": "FirefoxOS",
        "title": "yebhi.com isn't redirecting to mobile site on Firefox OS"
    },
    "960035": {
        "url": "http://alibaba.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.alibaba.com";}
        ],
        "ua": "FirefoxOS",
        "title": "alibaba.com sends desktop site to Firefox OS"
    },
    "937472": {
        "url": "http://www.bomnegocio.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bomnegocio.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bomnegocio.com doesn't recognize B2G UA as mobile"
    },
    "945430": {
        "url": "http://ups.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ups.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "http://ups.com gives the desktop site to B2G"
    },
    "937478": {
        "url": "http://www.band.uol.com.br/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "band.uol.com.br recognizes B2G UA as an iPhone"
    },
    "960001": {
        "url": "http://kalahari.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.kalahari.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "kalahari.com sends desktop site to Firefox OS"
    },
    "960021": {
        "url": "http://vodacom.co.za",
        "steps": [
            function(){return location.hostname === "www.vodacom.mobi" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "vodacom.co.za sends desktop site to Firefox OS"
    },
    "960020": {
        "url": "http://indeed.co.za",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "indeed.co.za sends desktop site to Firefox OS"
    },
    "960023": {
        "url": "http://timeslive.co.za",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.timeslive.co.za";}
        ],
        "ua": "FirefoxOS",
        "title": "timeslive.co.za sends desktop site to Firefox OS"
    },
    "960003": {
        "url": "http://property24.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.property24.com";}
        ],
        "ua": "FirefoxOS",
        "title": "property24.com sends desktop site to Firefox OS"
    },
    "843126": {
        "url": "http://es.playstation.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.es.playstation.com";}
        ],
        "ua": "FirefoxOS",
        "title": "es.playstation.com doesn't recognize B2G or Fennec UAs as mobile"
    },
    "959976": {
        "url": "http://junkmail.co.za",
        "steps": [
            function(){return location.hostname === "m.junkmail.co.za" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "junkmail.co.za sends desktop site to Firefox OS"
    },
    "959974": {
        "url": "http://olx.co.za",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.olx.co.za" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "olx.co.za sends desktop site to Firefox OS"
    },
    "957843": {
        "url": "http://m.lashou.com",
        "steps": [
            function(){return document.scripts.length>2;}
        ],
        "ua": "FirefoxOS",
        "title": "m.lashou.com sends simplified site to Firefox OS"
    },
    "959488": {
        "url": "http://m.m18.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.m18.com sends desktop site to Firefox OS"
    },
    "937441": {
        "url": "http://www.submarino.com.br",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.submarino.com.br" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "submarino.com.br has UA sniffer that doesn't detect Firefox OS"
    },
    "933621": {
        "url": "http://www.cardekho.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.cardekho.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "cardekho.com isn't redirecting to mobile site on Firefox OS"
    },
    "933629": {
        "url": "http://www.carwale.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "carwale.com isn't redirecting to mobile site on Firefox OS"
    },
    "888726": {
        "url": "http://m.blinkx.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "m.blinkx.com can\u2019t play a video"
    },
    "945943": {
        "url": "http://www.groupon.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.groupon.com";}
        ],
        "ua": "FirefoxOS",
        "title": "groupon.com serves desktop sites to Firefox OS"
    },
    "933601": {
        "url": "http://www.axisbank.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.axisbank.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "axisbank.com isn't redirecting to mobile site on Firefox OS"
    },
    "933600": {
        "url": "http://in.bookmyshow.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "in.bookmyshow.com isn't redirecting to mobile site on Firefox OS"
    },
    "915339": {
        "url": "http://abcnews.go.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "ABCnews.go.com doesn't send the mobile version to Firefox on Mobile"
    },
    "960437": {
        "url": "http://excite.co.jp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "a.excite.co.jp" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "excite.co.jp sends desktop site to Firefox OS"
    },
    "960434": {
        "url": "http://exblog.jp",
        "steps": [
            function(){return location.hostname === "sp.exblog.jp";}
        ],
        "ua": "FirefoxOS",
        "title": "exblog.jp sends desktop site to Firefox OS"
    },
    "960432": {
        "url": "http://nifty.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "nifty.com / cocolog-nifty.com sends desktop site to Firefox OS and Firefox on Android"
    },
    "958415": {
        "url": "http://www.ameba.jp/",
        "steps": [
            function(){return location.hostname === "s.amebame.com";}
        ],
        "ua": "FirefoxOS",
        "title": "ameba.jp shows blank page when browsing Firefox Android"
    },
    "960431": {
        "url": "http://tabelog.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.tabelog.com";}
        ],
        "ua": "FirefoxOS",
        "title": "tabelog.com sends desktop site to Firefox OS"
    },
    "931816": {
        "url": "http://www.contra.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.contra.gr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "contra.gr doesn't redirect to mobile site on Firefox OS"
    },
    "931833": {
        "url": "http://www.capital.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.capital.gr";}
        ],
        "ua": "FirefoxOS",
        "title": "capital.gr doesn't redirect to mobile site on Firefox OS and Firefox for Android"
    },
    "960443": {
        "url": "http://www.ocn.ne.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.ocn.ne.jp sends desktop site to Firefox OS"
    },
    "957853": {
        "url": "http://www.hotmail.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "hotmail.com / mail.live.com sends desktop content to Firefox OS"
    },
    "935908": {
        "url": "http://www.cbs.com/",
        "steps": [
            function(){return hasViewportMeta() && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "cbs.com sends desktop content to FirefoxOS"
    },
    "958474": {
        "url": "http://www.abudhabiairport.ae",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.abudhabiairport.ae" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "abudhabiairport.ae doesn't redirect to mobile site on Firefox OS"
    },
    "931785": {
        "url": "http://www.sport24.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sport24.gr" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "sport24.gr doesn't redirect to mobile site on Firefox OS"
    },
    "935905": {
        "url": "http://video.adultswim.com",
        "steps": [
            function(){return location.hostname === "m.adultswim.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "video.adultswim.com sends desktop content to FirefoxOS"
    },
    "804727": {
        "url": "http://harrypotter.wikia.com/",
        "steps": [
            function(){return hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "wikia.com serves desktop content to FirefoxOS because of UA sniffing"
    },
    "960446": {
        "url": "http://lenovo.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.lenovo.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "lenovo.com sends desktop site to Firefox OS"
    },
    "933628": {
        "url": "http://www.fashionandyou.com/",
        "steps": [
            function(){return location.hostname === "m.fashionandyou.com";}
        ],
        "ua": "FirefoxOS",
        "title": "fashionandyou.com isn't redirecting to mobile site on Firefox OS"
    },
    "933632": {
        "url": "http://www.cleartrip.com/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "cleartrip.com isn't redirecting to mobile site on Firefox OS"
    },
    "958411": {
        "url": "http://www.rakuten.co.jp/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "broken rendering on rakuten mobile top page"
    },
    "960427": {
        "url": "http://pixiv.net",
        "steps": [
            function(){return location.hostname === "touch.pixiv.net" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "pixiv.net sends desktop site to Firefox OS"
    },
    "933656": {
        "url": "http://www.raaga.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.raaga.com";}
        ],
        "ua": "FirefoxOS",
        "title": "raaga.com isn't redirecting to mobile site on Firefox OS"
    },
    "933657": {
        "url": "http://www.olx.in/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.olx.in" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "olx.in isn't redirecting to mobile site on Firefox OS"
    },
    "931825": {
        "url": "http://www.athensvoice.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.athensvoice.gr";}
        ],
        "ua": "FirefoxOS",
        "title": "athensvoice.gr doesn't redirect to mobile site on Firefox OS"
    },
    "960440": {
        "url": "http://cookpad.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "cookpad.com sends desktop site to Firefox OS"
    },
    "933653": {
        "url": "http://www.jagran.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.jagran.com";}
        ],
        "ua": "FirefoxOS",
        "title": "jagran.com isn't redirecting to mobile site on Firefox OS"
    },
    "933650": {
        "url": "http://www.indianexpress.com/",
        "steps": [
            function(){return location.hostname === "m.indianexpress.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "indianexpress.com isn't redirecting to mobile site on Firefox OS"
    },
    "945953": {
        "url": "http://map.baidu.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "map.baidu.com serves desktop content to Firefox OS"
    },
    "960433": {
        "url": "http://biglobe.ne.jp",
        "steps": [
            /* this code looks for the "switch to smartphone site" link that is a part of the desktop and tablet sites */
            function(){ if(!document.getElementById('devchange'))return 'delay-and-retry'; return ! document.querySelector('a[onclick*="B.devChange(\'sp\')"]');}
        ],
        "ua": "FirefoxOS",
        "title": "biglobe.ne.jp sends desktop site to Firefox OS"
    },
    "933670": {
        "url": "http://icicibank.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.icicibank.com";}
        ],
        "ua": "FirefoxOS",
        "title": "icicibank.com isn't redirecting to mobile site on Firefox OS"
    },
    "804642": {
        "url": "http://www.baidu.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "baidu.com UA sniffing serves non optimized content"
    },
    "935486": {
        "url": "http://www.biography.com/videos",
        "steps": [
            function(){return hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "biography.com fails to play video on FirefoxOS, shows \"requires Flash\" error"
    },
    "958400": {
        "url": "http://www.goo.ne.jp/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "goo.ne.jp sends desktop content to Firefox OS"
    },
    "931808": {
        "url": "http://news247.gr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.news247.gr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "news247.gr doesn't redirect to mobile site on Firefox OS"
    },
    "960423": {
        "url": "http://kakaku.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "s.kakaku.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "kakaku.com sends desktop site to Firefox OS"
    },
    "960405": {
        "url": "http://nicovideo.jp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "sp.nicovideo.jp";}
        ],
        "ua": "FirefoxOS",
        "title": "nicovideo.jp sends desktop site to Firefox OS"
    },
    "870209": {
        "url": "http://polygamia.pl/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.polygamia.pl";}
        ],
        "ua": "FirefoxOS",
        "title": "polygamia.pl doesn't send mobile content to Firefox OS"
    },
    "933675": {
        "url": "http://www.indeed.co.in/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "indeed.co.in isn't redirecting to mobile site on Firefox OS"
    },
    "960030": {
        "url": "http://us.jobrapido.com",
        "steps": [
            /* This page is transformed into a mobile page from JS */
            function(){return mobileLinkOrScriptUrl() || document.documentElement.className.indexOf('mobile')>-1;}
        ],
        "ua": "FirefoxOS",
        "title": "jobrapido.com sends desktop site to Firefox OS"
    },

    "964532": {
        "url": "http://www.voyages-sncf.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "voyages-sncf.mobi";}
        ],
        "ua": "FirefoxOS",
        "title": "www.voyages-sncf.com sends desktop site to Firefox OS"
    },
    "964160": {
        "url": "http://commentcamarche.net/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.commentcamarche.net" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "commentcamarche.net is sending desktop content to Firefox OS"
    },
    "964162": {
        "url": "http://www.sfr.fr/",
        "steps": [
            function(){return location.hostname === "m.sfr.fr";}
        ],
        "ua": "FirefoxOS",
        "title": "sfr.fr is sending desktop content to Firefox OS"
    },
    "964163": {
        "url": "http://pagesjaunes.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.pagesjaunes.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "pagesjaunes.fr is sending desktop content to Firefox OS"
    },
    "964577": {
        "url": "http://www.eurosport.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.eurosport.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.eurosport.fr sends desktop site to Firefox OS"
    },
    "933603": {
        "url": "http://www.asklaila.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.asklaila.com";}
        ],
        "ua": "FirefoxOS",
        "title": "asklaila.com isn't redirecting to mobile site on Firefox OS"
    },
    "964575": {
        "url": "http://www.credit-agricole.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "ca-mobile.com";}
        ],
        "ua": "FirefoxOS",
        "title": "www.credit-agricole.fr sends desktop site to Firefox OS"
    },
    "966504": {
        "url": "http://www.ztedevices.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ztedevice.com";}
        ],
        "ua": "FirefoxOS",
        "title": "Ztedevices.com sends FFOS to desktop site instead of mobile"
    },
    "964600": {
        "url": "http://www.egaliteetreconciliation.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.egaliteetreconciliation.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.egaliteetreconciliation.fr sends desktop site to Firefox OS"
    },
    "966464": {
        "url": "http://www.pcgamer.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.pcgamer.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "PC gamer sends desktop site to FxOS"
    },
    "964080": {
        "url": "http://www.lynda.com/",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags() && location.hostname === "m.lynda.com";}
        ],
        "ua": "FirefoxOS",
        "title": "Lynda.com isn't redirecting to Mobile site"
    },
    "964603": {
        "url": "http://www.indeed.fr/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.indeed.fr sends desktop site to Firefox OS"
    },
    "964602": {
        "url": "http://www.zalando.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.zalando.fr";}
        ],
        "ua": "FirefoxOS",
        "title": "www.zalando.fr sends desktop site to Firefox OS"
    },
    "964607": {
        "url": "http://portail.free.fr/",
        "steps": [
            function(){return hasViewportMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "portail.free.fr sends desktop site to Firefox OS"
    },
    "964521": {
        "url": "http://tf1.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.tf1.fr";}
        ],
        "ua": "FirefoxOS",
        "title": "tf1.fr sends desktop site to Firefox OS"
    },
    "964596": {
        "url": "http://www.rfi.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rfi.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.rfi.fr sends desktop site to Firefox OS"
    },
    "964547": {
        "url": "http://www.vente-privee.com/",
        "steps": [
            function(){return hasVideoTags() && location.hostname === "m.vente-privee.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.vente-privee.com sends desktop site to Firefox OS"
    },
    "964567": {
        "url": "http://www.20minutes.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.20minutes.fr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.20minutes.fr sends desktop site to Firefox OS"
    },
    "966470": {
        "url": "http://www.ign.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ign.com";}
        ],
        "ua": "FirefoxOS",
        "title": "ign.com serves FxOS desktop site"
    },
    "965753": {
        "url": "http://www.koreaherald.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.koreaherald.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.koreaherald.com sends desktop site to Firefox OS"
    },
    "965694": {
        "url": "http://afii.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.invest-in-france.org";}
        ],
        "ua": "FirefoxOS",
        "title": "afii.fr sends desktop site to Firefox OS"
    },
    "963954": {
        "url": "http://el-carabobeno.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.el-carabobeno.com";}
        ],
        "ua": "FirefoxOS",
        "title": "el-carabobeno.com doesn't recognize B2G UA as mobile"
    },
    "963955": {
        "url": "http://www.bod.com.ve/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "bod.com.ve doesn't recognize B2G UA as mobile"
    },
    "966082": {
        "url": "http://www.nasdaq.com/",
        "steps": [
            function(){return location.hostname === "m.nasdaq.com";}
        ],
        "ua": "FirefoxOS",
        "title": "www.nasdaq.com sends desktop site to Firefox OS"
    },
    "964565": {
        "url": "http://www.leparisien.fr/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.leparisien.fr" && hasMobileOptimizedMeta() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.leparisien.fr sends desktop site to Firefox OS"
    },
    "960918": {
        "url": "http://allabout.co.jp",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.allabout.co.jp";}
        ],
        "ua": "FirefoxOS",
        "title": "allabout.co.jp sends desktop site to Firefox OS"
    },
    "960870": {
        "url": "http://www.ldblog.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.ldblog.jp sends desktop site to Firefox OS"
    },
    "891032": {
        "url": "http://www.summitracing.com/",
        "steps": [
            noWapContentPlease
        ],
        "ua": "FirefoxOS",
        "testType": "xhr",
        "title": "(SummitRacing.com) - Serving WAP to Firefox on Android"
    },
    "960910": {
        "url": "http://jugem.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "jugem.jp sends desktop site to Firefox OS"
    },
    "960913": {
        "url": "http://say-move.org",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "say-move.org sends desktop site to Firefox OS"
    },
    "961389": {
        "url": "http://automart.co.za",
        "steps": [
            function(){return location.hostname === "m.automart.co.za";}
        ],
        "ua": "FirefoxOS",
        "title": "automart.co.za sends desktop site to Firefox OS"
    },
    "960916": {
        "url": "http://www.jalan.net/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "jalan.net sends desktop site to Firefox OS"
    },
    "971228": {
        "url": "http://www.geek.com",
        "steps": [
            function(){/*NOOP - js redirect must kick in*/},
            function(){/*NOOP - js redirect must kick in*/},
            function(){return location.hostname === "mobile.geek.com";}
        ],
        "ua": "FirefoxOS",
        "title": "Geek.com serves mobile site to iphone, desktop site to Firefox mobile, Chrome, Opera"
    },
    "960909": {
        "url": "http://hotpepper.jp",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "hotpepper.jp sends desktop site to Firefox OS and Firefox on Android"
    },
    "969844": {
        "url": "http://mobile.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mobile.de";}
        ],
        "ua": "FirefoxOS",
        "title": "mobile.de sends desktop site to Firefox OS and Firefox on Android"
    },
    "969849": {
        "url": "http://idealo.de",
        "steps": [
            function(){return location.hostname === "mobil.idealo.de";}
        ],
        "ua": "FirefoxOS",
        "title": "idealo.de sends desktop site to Firefox OS"
    },
    "958575": {
        "url": "https://news.google.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Google News - Tablet experience in Chrome for Android superior to Firefox for Android"
    },
    "827622": {
        "url": "http://www.bing.com/",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags() && hasMobileOptimizedMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "bing.com doesn't recognize B2G UA as mobile"
    },
    "960949": {
        "url": "http://www.kuronekoyamato.co.jp/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.kuronekoyamato.co.jp sends desktop site to Firefox OS"
    },
    "967066": {
        "url": "http://www.ndtv.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.ndtv.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "ndtv.com sends desktop version to Firefox OS"
    },
    "971576": {
        "url": "http://montevideo.com.uy",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "montevideo.com.uy sends desktop site to Firefox OS"
    },
    "962922": {
        "url": "http://www.montrealgazette.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "montrealgazette.com sends desktop content to Firefox OS, Firefox Android and Opera Mobile"
    },
    "815823": {
        "url": "http://www.ocn.ne.jp/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.ocn.ne.jp does not work correctly in Firefox Android"
    },
    "961025": {
        "url": "http://www.getresponse.com/",
        "steps": [
            function(){return location.hostname === "m.getresponse.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "getresponse.com sends desktop site to Firefox OS"
    },
    "961390": {
        "url": "http://www.answers.com/",
        "steps": [
            function(){return document.documentElement.className.indexOf('touchscreen')>-1;}
        ],
        "ua": "FirefoxOS",
        "title": "answers.com sends desktop site to Firefox OS"
    },
    "798769": {
        "url": "http://m.novinky.cz/articleDetails?aId=280744",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "Unable to play video on mobile Novinky.cz and Super.cz"
    },
    "961388": {
        "url": "http://makro.co.za",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "makro.co.za sends desktop site to Firefox OS"
    },
    "964609": {
        "url": "http://www.metronews.fr/",
        "steps": [
            function(){return location.hostname === "touch.metronews.fr";}
        ],
        "ua": "FirefoxOS",
        "title": "www.metronews.fr sends desktop site to Firefox OS"
    },
    "964746": {
        "url": "http://mapquest.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.mapquest.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Mapquest mobile site offers less features with gecko if compared to webkit"
    },
    "944507": {
        "url": "https://mail.yahoo.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "mail.yahoo.com is sending desktop content to Firefox OS"
    },
    "966860": {
        "url": "http://hulu.com",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "hulu.com does not play video in Firefox on Android or Firefox OS"
    },
    "960900": {
        "url": "http://nikkansports.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "nikkansports.com sends desktop site to Firefox OS"
    },
    "960004": {
        "url": "http://pricecheck.co.za",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "touch.pricecheck.co.za"}
        ],
        "ua": "FirefoxOS",
        "title": "pricecheck.co.za sends simplified site to Firefox OS"
    },
    "945954": {
        "url": "http://map.baidu.com/",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "map.baidu.com serves a broken mobile site to Firefox Android"
    },
    "961130": {
        "url": "http://www.carsales.com.au",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "carsales.mobi" }
        ],
        "ua": "FirefoxOS",
        "title": "Carsales.com.au serves Firefox OS desktop site"
    },
    "961391": {
        "url": "http://careerjunction.co.za",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.careerjunction.co.za";}
        ],
        "ua": "FirefoxOS",
        "title": "careerjunction.co.za sends desktop site to Firefox OS"
    },
    "945958": {
        "url": "http://music.baidu.com/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "music.baidu.com serves desktop content to Firefox OS"
    },
    "969854": {
        "url": "http://www.autoscout24.de/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.autoscout24.de";}
        ],
        "ua": "FirefoxOS",
        "title": "autoscout24.de sends desktop site to Firefox OS"
    },
    "972378": {
        "url": "http://nordea.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.nordea.no";}
        ],
        "ua": "FirefoxOS",
        "title": "nordea.no sends desktop site to Firefox OS"
    },
    "973263": {
        "url": "http://www.swisschalet.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.swisschalet.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Swisschalet.com serves desktop site to Firefox OS"
    },
    "973354": {
        "url": "http://www.nhl.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "NHL.com serves desktop content to Firefox OS"
    },
    "969830": {
        "url": "http://www.ebay.de",
        "steps": [
            function(){return location.hostname === "m.ebay.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "ebay.de doesn't load mobile site for FOS."
    },
    "969838": {
        "url": "http://wetter.com",
        "steps": [
            function(){return location.hostname === "www.wetter.com";}
        ],
        "ua": "FirefoxOS",
        "title": "wetter.com sends desktop site to Firefox OS"
    },
    "969833": {
        "url": "http://t-online.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.t-online.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "t-online.de sends desktop site to Firefox OS"
    },
    "969842": {
        "url": "http://welt.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.welt.de";}
        ],
        "ua": "FirefoxOS",
        "title": "welt.de sends desktop site to Firefox OS and Firefox on Android"
    },
    "969837": {
        "url": "http://chip.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.chip.de";}
        ],
        "ua": "FirefoxOS",
        "title": "chip.de sends desktop site to Firefox OS"
    },
    "972337": {
        "url": "http://dagbladet.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.db.no";}
        ],
        "ua": "FirefoxOS",
        "title": "dagbladet.no sends desktop site to Firefox OS"
    },
    "972353": {
        "url": "http://www.sol.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sol.no";}
        ],
        "ua": "FirefoxOS",
        "title": "sol.no sends desktop site to Firefox OS and Firefox for Android"
    },
    "972339": {
        "url": "http://startsiden.no",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "startsiden.no sends desktop site to Firefox OS"
    },
    "972342": {
        "url": "http://sparebank1.no",
        "steps": [
            function(){return location.hostname === "mobil.sparebank1.no";}
        ],
        "ua": "FirefoxOS",
        "title": "sparebank1.no sends desktop site to Firefox OS"
    },
    "969863": {
        "url": "http://www.meinestadt.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.mobil.meinestadt.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "meinestadt.de sends desktop site to Firefox OS"
    },
    "969858": {
        "url": "https://www.deutsche-bank.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.db.com" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "deutsche-bank.de sends desktop site to Firefox OS"
    },
    "969848": {
        "url": "http://postbank.de",
        "steps": [
            function(){return location.hostname === "m.postbank.de";}
        ],
        "ua": "FirefoxOS",
        "title": "postbank.de sends desktop site to Firefox OS"
    },
    "969855": {
        "url": "http://zalando.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.zalando.de";}
        ],
        "ua": "FirefoxOS",
        "title": "zalando.de sends desktop site to Firefox OS"
    },
    "972348": {
        "url": "http://dinside.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.dinside.no" && hasMobileOptimizedMeta() && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "dinside.no sends desktop site to Firefox OS"
    },
    "969852": {
        "url": "http://www.otto.de",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.otto.de" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "otto.de sends desktop site to Firefox OS"
    },
    "972368": {
        "url": "http://zalando.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.zalando.no";}
        ],
        "ua": "FirefoxOS",
        "title": "zalando.no sends desktop site to Firefox OS"
    },
    "972363": {
        "url": "http://www.nettavisen.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.nettavisen.no" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "nettavisen.no sends desktop site to Firefox OS"
    },
   "972383": {
        "url": "http://dn.no",
        "steps": [
            function(){return location.hostname === "mobil.dn.no" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "dn.no sends desktop site to Firefox OS"
    },
    "970490": {
        "url": "http://www.nikon.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "Nikon.com landing page shows desktop for Firefox OS"
    },
    "972738": {
        "url": "http://www.aetv.com/dont-trust-andrew-mayne/video/love-on-the-blocks",
        "steps": [
            function(){return hasVideoTags();}
        ],
        "ua": "FirefoxOS",
        "title": "aetv.com doesn't create video player in the Firefox OS web browser"
    },
    "972376": {
        "url": "http://adressa.no",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "adressa.no sends desktop site to Firefox OS"
    },
    "972384": {
        "url": "http://abcnyheter.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "abcnyheter.no" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "abcnyheter.no sends desktop site to Firefox OS"
    },
    "972390": {
        "url": "http://norsk-tipping.no",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "norsk-tipping.no sends desktop site to Firefox OS"
    },
    "981388": {
        "url": "http://77news.al",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "77news.al has broken layout in Firefox OS"
    },
    "981385": {
        "url": "http://dielli.al",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "dielli.al has broken layout in Firefox OS"
    },
    "981384": {
        "url": "http://albeu.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.albeu.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "albeu.com has broken layout in Firefox OS"
    },
    "981387": {
        "url": "http://living.al",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.living.al" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "living.al has broken layout in Firefox OS"
    },
    "981381": {
        "url": "http://ikub.al",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "mobile.ikub.al" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "ikub.al has broken layout in Firefox OS"
    },
    "981380": {
        "url": "http://top-channel.tv",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "top-channel.tv has broken layout in Firefox OS"
    },
    "975329": {
        "url": "http://glasistre.hr",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.glasistre.hr" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "glasistre.hr sends desktop site to Firefox OS"
    },
    "979062": {
        "url": "http://bancoestado.cl",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "bancoestado.cl sends desktop site to Firefox OS"
    },
    "932846": {
        "url": "http://rediff.com/",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rediff.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "rediff.com isn't redirecting to mobile site on Firefox OS"
    },
    "974529": {
        "url": "http://www.bestbuy.ca",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.bestbuy.ca" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "Bestbuy.ca and Futureshop.ca send Firefox OS to desktop site instead of mobile."
    },
    "978818": {
        "url": "http://taringa.net",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.taringa.net";}
        ],
        "ua": "FirefoxOS",
        "title": "taringa.net sends simplified site to Firefox OS"
    },
    "978817": {
        "url": "http://ole.com.ar",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "ios.ole.com.ar";}
        ],
        "ua": "FirefoxOS",
        "title": "ole.com.ar sends desktop site to Firefox OS"
    },
    "979704": {
        "url": "http://www.roomie.jp/",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "www.roomie.jp sends the desktop version to Firefox OS"
    },
    "978090": {
        "url": "http://bancochile.cl",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "www.bancamovil.bancochile.cl";}
        ],
        "ua": "FirefoxOS",
        "title": "bancochile.cl sends desktop site to Firefox OS"
    },
    "981829": {
        "url": "http://www.chicagotribune.com/",
        "steps": [
            function(){
                return hasViewportMeta() && location.hostname === "www.chicagotribune.com";}
        ],
        "ua": "FirefoxOS",
        "title": "Chicago Tribune - redirection loop with Firefox for Android UA"
    },
    "974800": {
        "url": "http://junglee.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "junglee.com sends desktop site to Firefox OS"
    },
    "978824": {
        "url": "http://despegar.com.ar",
        "steps": [
            function(){return location.hostname === "m.despegar.com.ar" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "despegar.com.ar sends desktop site to Firefox OS"
    },
    "978822": {
        "url": "http://alamaula.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.alamaula.com";}
        ],
        "ua": "FirefoxOS",
        "title": "alamaula.com sends desktop site to Firefox OS"
    },
    "978829": {
        "url": "http://babylon.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "babylon.com sends desktop site to Firefox OS"
    },
    "973811": {
        "url": "http://www.bhg.com",
        "steps": [
            function(){return hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "bhg.com sends desktop content to Firefox OS"
    },
    "974792": {
        "url": "http://way2sms.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m1.way2sms.com";}
        ],
        "ua": "FirefoxOS",
        "title": "way2sms.com sends desktop site to Firefox OS"
    },
    "974793": {
        "url": "http://myntra.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "myntra.com sends desktop site to Firefox OS"
    },
    "974791": {
        "url": "http://moneycontrol.com",
        "steps": [
            function(){return location.hostname === "m.moneycontrol.com";}
        ],
        "ua": "FirefoxOS",
        "title": "moneycontrol.com sends desktop site to Firefox OS"
    },
    "974795": {
        "url": "http://hindustantimes.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "hindustantimes.com sends desktop site to Firefox OS"
    },
    "979797": {
        "url": "http://www.cinesunidos.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "pda.cinesunidos.com";}
        ],
        "ua": "FirefoxOS",
        "title": "cinesunidos.com sends desktop site to Firefox OS"
    },
    "946280": {
        "url": "http://www.gammonsdaily.com/peter-gammons-the-new-generation-of-shortstops/",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "www.gammonsdaily.com - text cut off on Gammon's daily"
    },
    "978832": {
        "url": "http://minutouno.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.minutouno.com" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "minutouno.com sends desktop site to Firefox OS"
    },
    "978830": {
        "url": "http://mundogaturro.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "mundogaturro.com sends desktop site to Firefox OS"
    },
    "978834": {
        "url": "http://mega.co.nz",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "mega.co.nz sends simplified site to Firefox OS"
    },
    "978839": {
        "url": "http://groupon.com.ar",
        "steps": [
            function(){return location.hostname === "m.groupon.com.ar";}
        ],
        "ua": "FirefoxOS",
        "title": "groupon.com.ar sends desktop site to Firefox OS"
    },
    "973806": {
        "url": "http://video.disney.co.jp",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "video.disney.co.jp sends desktop content, shows flash error instead of video"
    },
    "974789": {
        "url": "http://indiatimes.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.indiatimes.com" && mobileLinkOrScriptUrl() && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "indiatimes.com sends desktop site to Firefox OS"
    },
    "980326": {
        "url": "http://banrisul.com.br",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "ww7.banrisul.com.br";}
        ],
        "ua": "FirefoxOS",
        "title": "banrisul.com.br sends desktop site to Firefox OS"
    },
    "978845": {
        "url": "http://ehowenespanol.com",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "ehowenespanol.com sends desktop site to Firefox OS"
    },
    "979315": {
        "url": "http://www.rpp.com.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.rpp.com.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "rpp.com.pe sends desktop site"
    },
    "978841": {
        "url": "http://forobeta.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "forobeta.com sends desktop site to Firefox OS"
    },
    "974173": {
        "url": "http://m.nissanusa.com",
        "steps": [
            function(){return hasViewportMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "m.nissanusa.com gives error 500/404 to Firefox Android and Firefox OS"
    },
    "974170": {
        "url": "http://www.nissanusa.com",
        "steps": [
            function(){return hasVideoTags() && location.hostname === "m.nissanusa.com";}
        ],
        "ua": "FirefoxOS",
        "title": "nissanusa.com & nissan.ca send desktop site to Firefox OS"
    },
    "982021": {
        "url": "http://balkanweb.com",
        "steps": [
            function(){return location.hostname === "balkanweb.com";}
        ],
        "ua": "FirefoxOS",
        "title": "balkanweb.com has broken layout in Firefox OS"
    },
    "979321": {
        "url": "http://peru21.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.peru21.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "peru21.pe sends desktop site to Firefox OS"
    },
    "975922": {
        "url": "http://kjendis.no",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.kjendis.no";}
        ],
        "ua": "FirefoxOS",
        "title": "kjendis.no sends desktop site to Firefox OS"
    },
    "980572": {
        "url": "http://www.wsj.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname.indexOf('m.')>-1 && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "wsj.com returns desktop not mobile site to Firefox Android and Firefox OS"
    },
    "979348": {
        "url": "http://www.falabella.com.pe",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.falabella.com.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "falabella.com.pe sends desktop site to Firefox OS"
    },
    "974796": {
        "url": "http://sify.com",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.sify.com" && hasHandheldFriendlyMeta();}
        ],
        "ua": "FirefoxOS",
        "title": "sify.com sends desktop site to Firefox OS"
    },
    "979116": {
        "url": "http://yapo.cl",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.yapo.cl" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "yapo.cl sends desktop site to Firefox OS"
    },
    "979113": {
        "url": "http://www.emol.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "emol.com sends desktop site to Firefox OS"
    },
    "979336": {
        "url": "http://www.tuteve.tv",
        "steps": [
            function(){return hasViewportMeta() && location.hostname === "m.tuteve.tv" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "tuteve.tv sends desktop site to Firefox OS"
    },
    "979358": {
        "url": "http://libero.pe",
        "steps": [
            function(){return location.hostname === "m.libero.pe";}
        ],
        "ua": "FirefoxOS",
        "title": "libero.pe sends desktop site to Firefox OS"
    },
    "979693": {
        "url": "http://repubblica.it",
        "steps": [
            function(){return mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "repubblica.it renders low-quality images on Firefox OS"
    },
    "976206": {
        "url": "http://www.xbox.com",
        "steps": [
            function(){return hasViewportMeta() && hasVideoTags() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "xbox.com serves desktop content to Firefox mobile"
    },
    "978820": {
        "url": "http://www.tn.com.ar",
        "steps": [
            function(){return location.hostname === "m.tn.com.ar" && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "tn.com.ar sends desktop site to Firefox OS"
    },
    "983727": {
        "url": "http://forbes.com",
        "steps": [
            function(){return hasViewportMeta() && mobileLinkOrScriptUrl();}
        ],
        "ua": "FirefoxOS",
        "title": "forbes.com sends desktop site to Firefox OS"
    }

}

// merge automated tests into bugdata
for(var bug in automated_tests){
    if(!(bug in bugdata))bugdata[bug] = automated_tests[bug];
}

// populate hosts object
for(var bug in bugdata){
    var match, host;
    if(match = bugdata[bug].url.match(/https?:\/\/([^\/]*)/)){
        host = match[1];
        /* drop certain prefixes */
        if( /^www\./.test(host) )host = host.replace(/^www\./, '');
        if( /^m\./.test(host) )host = host.replace(/^m\./, '');
        if(!hosts[host])hosts[host] = [];
        hosts[host].push(bug);
    }
}

// looks for <meta name="HandheldFriendly" content="true">
function hasHandheldFriendlyMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/HandheldFriendly/i.test(el.getAttribute('name')) && /true/i.test(el.getAttribute('content')))return true;
    }
    return false;
}
// looks for <meta name="viewport"
function hasViewportMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/viewport/i.test(el.getAttribute('name')))return true;
    }
    return false;
}
// looks for <meta name="MobileOptimized" content="width">
function hasMobileOptimizedMeta(){
    for(var elms = document.getElementsByTagName('meta'), el, i=0; el=elms[i]; i++){
        if(/MobileOptimized/i.test(el.getAttribute('name')) && /(width|\d+)/i.test(el.getAttribute('content')))return true;
    }
    return false;
}
// Check if there is a SCRIPT src or LINK href that contains the word "mobile"
function mobileLinkOrScriptUrl(str){
    str = str || 'mobile';
    for(var i=0,el; el=document.scripts[i];i++){if(el.src&&el.src.indexOf(str)>-1){return true;}}
    for(var i=0,el,elms=document.getElementsByTagName('link'); el=elms[i];i++){if(el.href&&el.href.indexOf(str)>-1){return true;}}
    return false;
}
function hasVideoTags(){
    return !!document.getElementsByTagName('video').length;
}
function noWapContentPlease(response){
    var contentType;
    for(var prop in response.headers){
        if(/content-type/i.test(prop))contentType = response.headers[prop];
    }
    return contentType && ! (/application\/vnd\.wap\.xhtml\+xml/i.test(contentType));
}
// Util method used for -webkit- CSS issues.
// Scenario: in a style sheet, we find .foo{-webkit-bar:xxx} .foo2{-webkit-bar:xxx}
// this method can take arguments ['foo', 'foo2'] and ['-moz-bar', 'bar']
// check if class list matches some element in the page, if yes, check if
// computed style has '-moz-bar' or 'bar' methods defined
// could also loop through CSSOM but we'd run into lots of cross-domain
// protections for CDN-hosted style sheets, so it's better (although slower) to look at elements
// and computed styles
// Passes if *one* of the class names contains *one* of the properties. Use with care :)
function cssCheck(classNameList, propertiesThatMustExist){
    var cssFalseishStuff = {'':1, 'none':1, 'auto': 1}
    for(var cn, i=0; cn=classNameList[i]; i++){
        for(var elms = document.getElementsByClassName(cn), j=0, el; el=elms[j]; j++){
            var style = getComputedStyle(el,null);
            for(var k=0, prop; prop = propertiesThatMustExist[k]; k++){
                if( typeof style[k] === 'string' && ! ( style[k] in cssFalseishStuff) )return true;
            }
        }
    }
    return false;
}
// This is a helper method that will attempt to submit a login form if the password manager has filled in a password
// pass the ID of the password field and the ID of the button/element to click() in order to log in
function tryLogin(passwdId, loginBtnId){
    if(document.getElementById(passwdId)){
        if(document.getElementById(passwdId).value!=''){ // Yay, we have a stored password - it's autocompleted..
            document.getElementById(loginBtnId).click();
        }else{
            throw 'Can\'t test, no stored password';
        }
    }else{
        console.log('password element not found, have session already?')
        return 'password element not found, have session already?' /* Not sure if we'll make use of this anywhere */
    }
}
