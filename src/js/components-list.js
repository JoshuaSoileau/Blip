var componentsArray = [
    // "components/presentations_components/navigation_bar",
    // "components/menu/01--desktop",
    // "components/menu/01",
    // "components/menu/02--desktop",
    // "components/menu/03",
    // "components/menu/05",
    // "components/menu/06",
    // "components/menu/07",
    // "components/menu/08",
    // "components/menu/13",
    // "components/menu/14",
    "components/covers/01",
    "components/covers/02",
    "components/covers/03",
    "components/covers/04",
    "components/covers/05",
    "components/covers/06",
    "components/covers/07",
    "components/covers/08",
    "components/covers/09",
    "components/covers/10",
    "components/covers/11",
    "components/covers/12",
    "components/covers/13",
    "components/covers/14",
    "components/covers/15",
    "components/covers/16",
    "components/covers/17",
    "components/covers/18",
    "components/covers/19",
    "components/covers/20",
    "components/covers/21",
    "components/call_to_actions/01",
    "components/call_to_actions/02",
    "components/call_to_actions/03",
    "components/call_to_actions/04",
    "components/call_to_actions/05",
    "components/call_to_actions/06",
    "components/call_to_actions/07",
    "components/call_to_actions/08",
    "components/call_to_actions/09",
    "components/call_to_actions/10",
    "components/call_to_actions/11",
    "components/call_to_actions/12",
    "components/call_to_actions/13",
    "components/call_to_actions/14",
    "components/call_to_actions/15",
    "components/call_to_actions/16",
    "components/call_to_actions/17",
    "components/call_to_actions/18",
    "components/features/01",
    "components/features/02",
    "components/features/03",
    "components/features/04",
    "components/features/05",
    "components/features/06",
    "components/features/07",
    "components/features/08",
    "components/features/09",
    "components/features/10",
    "components/features/11",
    "components/features/12",
    "components/partners/01",
    "components/partners/02",
    "components/partners/03",
    "components/counters/01",
    "components/counters/02",
    "components/counters/03",
    "components/testimonials/01",
    "components/testimonials/02",
    "components/testimonials/03",
    "components/testimonials/04",
    "components/testimonials/05",
    "components/testimonials/06",
    "components/about/01",
    "components/about/02",
    "components/about/03",
    "components/about/04",
    "components/about/05",
    "components/about/06",
    "components/about/07",
    "components/about/08",
    "components/contents/01",
    "components/contents/02",
    "components/contents/03",
    "components/contents/04",
    "components/contents/05",
    "components/team/01",
    "components/team/02",
    "components/team/03",
    "components/works/01",
    "components/works/02",
    "components/works/03",
    "components/works/04",
    "components/footers/01",
    "components/footers/02",
    "components/footers/03",
    "components/footers/04",
    "components/footers/05",
    "components/footers/06",
    "components/prices/01",
    "components/prices/02",
    "components/prices/03",
    "components/prices/04",
    "components/contacts/01",
    "components/contacts/02",
    "components/contacts/03",
    "components/contacts/04",
    "components/popups/video"
];

var components = (function() {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    function getComponentName(input) {
        var string = getComponentString(input).replaceAll('_', ' ');
        return capitalize(string);
    }
    function getComponentString(input) {
        return input.split('/')[1];
    }
    function getComponentImageUrl(input) {
        return '../src/img/components/' + getComponentName(input).replaceAll(' ', '\ ') + '/JPG/' + getComponentNumber(input) + ' ' + getComponentName(input) + '.jpg';
    }
    function getComponentNumber(input) {
        var split = input.split('/');
        return split[split.length - 1];
    }
    function getComponentTemplateId(input) {
        return input.replaceAll('/', '_');
    }
    function getComponentObject(input) {
        return {}[getComponentNumber(input)] = {
            name: getComponentName(input),
            string: getComponentString(input),
            image: getComponentImageUrl(input),
            templateId: getComponentTemplateId(input)
        }
    }
    function capitalize(input) {
        return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    var obj = {};
    componentsArray.forEach(function(item) {
        if(typeof obj[getComponentString(item)] === "undefined") obj[getComponentString(item)] = {};
        obj[getComponentString(item)][getComponentNumber(item)] = getComponentObject(item);
    });
    return obj;
})();