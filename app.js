function CsvToJsonCtrl($scope) {
    $scope.csv = "field1, field2, field3\nval1, val2, val3\nval4, val5, val6";
    $scope.parse = function() {
        var valuesArray = $scope.CSVtoArray($scope.csv);
        var fieldNames = valuesArray.splice(0, 1)[0];
        var objectsArray = valuesArray.map(function(values){
                                                var object = {};
                                                for (var i = 0; i < values.length; i++) {
                                                    object[fieldNames[i]] = values[i];
                                                };
                                                return object;
                                            });
        $scope.json = JSON.stringify(objectsArray, undefined, 2);
    };

    // from http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
    $scope.CSVtoArray = function ( strData, strDelimiter ){
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp(
            (
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec( strData )){
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
                ){
                arrData.push( [] );
            }
            if (arrMatches[ 2 ]){
                var strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );
            } else {
                var strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        return( arrData );
    }
}
