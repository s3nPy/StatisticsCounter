import { useCallback } from 'react';

export const useToast = () => {
    return useCallback( text => {
        if(window.M && text)
            window.M.toast({
                html: text,
                classes: "deep-purple lighten-3 deep-purple-text text-lighten-5 toast"
            });
    }, []);
};