
export function usernameHashCode (str) {
        if (typeof str !== 'string') return;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        var c = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;

        //return hash;
      }