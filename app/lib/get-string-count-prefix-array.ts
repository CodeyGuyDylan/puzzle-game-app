const getStringCountPrefixArray = ( arr: string[] ) => {
    if ( arr.length === 0 ) {
        return [];
    }

    const prefixArray: number[] = [ arr[0].length ];

    for ( let i = 1; i < arr.length; i++ ) {
        const strLen = arr[i].length;
        prefixArray.push( prefixArray[ i - 1 ] + strLen );
    }

    return prefixArray;
};

export default getStringCountPrefixArray;