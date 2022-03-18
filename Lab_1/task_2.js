function permute(string) {
    function recur(string, prefix) {
        if (string.length === 0) {
            return [prefix];
        } else {
            let out = [];
            for (let i = 0; i < string.length; i++) {
                let pre = string.substring(0, i);
                let post = string.substring(i + 1);
                out = out.concat(recur(pre + post, string[i] + prefix));
            }
            return out;
        }
    }
    let distinct = {};
    recur(string, "").forEach(function(result) {
        distinct[result] = true;
    });
    return Object.keys(distinct);
}

console.log(permute("mama"))