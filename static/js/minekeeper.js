var row_size = 9;
var col_size = 9;

function hasWon(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            var spot = getSpot(minefield, y, x);
            if(spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }
    return true;
}

function calculateNumber(minefield, row, column) {
    var thisSpot = getSpot(minefield, row, column);
    
    // if this spot contains a mine then we can't place a number here
    if(thisSpot.content == "mine") {
        return;
    }
    
    var mineCount = 0;

    // check row above if this is not the first row
    if(row > 0) {
        // check column to the left if this is not the first column
        if(column > 0) {
            // get the spot above and to the left
            var spot = getSpot(minefield, row - 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }

        // get the spot right above
        var spot = getSpot(minefield, row - 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }

        // check column to the right if this is not the last column
        if(column < 8) {
            // get the spot above and to the right
            var spot = getSpot(minefield, row - 1, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
    }

    // check column to the left if this is not the first column
    if(column > 0) {
        // get the spot to the left
        var spot = getSpot(minefield, row, column - 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }
    
    // check column to the right if this is not the last column
    if(column < 8) {
        // get the spot to the right
        var spot = getSpot(minefield, row, column + 1);
        if(spot.content == "mine") {
            mineCount++;
        }
    }

    // check row below if this is not the last row
    if(row < 8) {
        // check column to the left if this is not the first column
        if(column > 0) {
            // get the spot below and to the left
            var spot = getSpot(minefield, row + 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }

        // get the spot right below
        var spot = getSpot(minefield, row + 1, column);
        if(spot.content == "mine") {
            mineCount++;
        }

        // check column to the right if this is not the last column
        if(column < 8) {
            // get the spot below and to the right
            var spot = getSpot(minefield, row + 1, column + 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }
    }
    
    if(mineCount > 0) {
        thisSpot.content = mineCount;
    }
}

function getRow(minefield, spot) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            if (minefield.rows[y].spots[x] == spot) {
                return y;
            }
        }
    }
}

function getCol(minefield, spot) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            if (minefield.rows[y].spots[x] == spot) {
                return x;
            }
        }
    }
}

function uncoverSurrounding(minefield, spot) {
    var row = getRow(minefield, spot);
    var col = getCol(minefield, spot);
    console.log('row', row);
    console.log('col', col);
    // if not the first row, check up
    if (row - 1 >= 0) {
        var upSpot = minefield.rows[row - 1].spots[col];
        if (upSpot.content == 'empty' && upSpot.isCovered) {
            upSpot.isCovered = false;
            uncoverSurrounding(minefield, upSpot);
        }
        else
        {
            upSpot.isCovered = false;
        }
    }

    // if not the last row, check down
    if (row + 1 < row_size) {
        var downSpot = minefield.rows[row + 1].spots[col];
        if (downSpot.content == 'empty' && downSpot.isCovered) {
            downSpot.isCovered = false;
            uncoverSurrounding(minefield, downSpot);
        }
        else
        {
            downSpot.isCovered = false;
        }
    }

    // if not the leftmost col, check left
    if (col - 1 >= 0) {
        var leftSpot = minefield.rows[row].spots[col - 1];
        if (leftSpot.content == 'empty' && leftSpot.isCovered) {
            leftSpot.isCovered = false;
            uncoverSurrounding(minefield, leftSpot);
        }
        else
        {
            leftSpot.isCovered = false;
        }
    }

    // if not the rightmost col, check right
    if (col + 1 < col_size) {
        var rightSpot = minefield.rows[row].spots[col + 1];
        if (rightSpot.content == 'empty' && rightSpot.isCovered) {
            rightSpot.isCovered = false;
            uncoverSurrounding(minefield, rightSpot);
        }
        else
        {
            rightSpot.isCovered = false;
        }
    }
}

function calculateAllNumbers(minefield) {
    for(var y = 0; y < 9; y++) {
        for(var x = 0; x < 9; x++) {
            calculateNumber(minefield, x, y);
        }
    }
}

function createField() {
	var minefield = {};
	minefield.rows = [];

	for (var i = 0; i < 9; ++i) {
		var row = {};
		row.spots = [];

		for (var j = 0; j < 9; ++j) {
			var spot = {};
			spot.isCovered = true;
			spot.content = "empty";
            spot.isFlag = false;
			row.spots.push(spot);
		}
		minefield.rows.push(row);
	}
	placeRandom(minefield);
	calculateAllNumbers(minefield);
	return minefield;
}

function getSpot(minefield, row, column) {
	return minefield.rows[row].spots[column];
}

function placeRandom(minefield) {
	for (var i = 0; i < 20; ++i) {
		placeMine(minefield);
	}
}

function placeMine(minefield) {
	var row = Math.round(Math.random() * 8);
	var column = Math.round(Math.random() * 8);
	var spot = getSpot(minefield, row, column);
	spot.content = "mine";
}

var module = angular.module('myApp',[]);
module.controller("gameController", function($scope) {
	$scope.minefield = createField();
    $scope.reStart = function() {
        $scope.minefield = createField();
        $scope.isWinMessage = false;
        $scope.lostMessage = false;
    }
	$scope.uncoverSpot = function(spot) {
		if (!spot.isFlag) {
            spot.isCovered = false;
        }

        // if this spot is empty, it means some surrounding spots should be uncovred too
        if (spot.content == 'empty') {
            uncoverSurrounding($scope.minefield, spot);
        }

		if (spot.content == 'mine') {
			$scope.lostMessage = true;
		} else {
			if (hasWon($scope.minefield)) {
				$scope.isWinMessage = true;
			}
		}
	}
    $scope.rightClick = function(event, spot) {
        console.log(event.which);
        if (event.which == 3 && spot.isCovered) {
            spot.isFlag = !spot.isFlag;
        }
    }
});