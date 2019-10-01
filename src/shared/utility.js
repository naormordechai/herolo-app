export const getSearchParamsObj = (search) => {
    let params = {}
    if (search) {
        var parts = search.substring(1).split('&');

        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }
    return params;
}

export const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
}

