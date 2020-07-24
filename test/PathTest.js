var PF        = require('..')
var scenarios = require('./PathTestScenarios');

/**
 * Path-finding tests for the path-finders.
 * @param {boolean} opt.optimal - Whether the finder is guaranteed to find the shortest path
 */
function pathTest(opt) {
    var name = opt.name,
        finder = opt.finder,
        optimal = opt.optimal;

    describe(name, function() {
        var startX, startY, endX, endY, grid, expectedLength,
            width, height, matrix, path, i, scen;

        var test = (function() {
            var testId = 0;

            return function(startX, startY, endX, endY, grid, expectedLength) {
                it('should solve maze '+ ++testId, function() {
                    path = finder.findPath(startX, startY, endX, endY, grid);
                    if (optimal) {
                        path.length.should.equal(expectedLength);
                    } 
                });
            };
        })();

        // Load all the scenarios and test against the finder.
        for (i = 0; i < scenarios.length; ++i) {
            scen = scenarios[i];

            matrix = scen.matrix;
            height = matrix.length;
            width = matrix[0].length;

            grid = new PF.Grid(width, height, matrix);

            test(
                scen.startX, scen.startY, 
                scen.endX, scen.endY, 
                grid, 
                scen.expectedLength
            );
        }
    });
}

function pathTests(tests) {
    for (i = 0; i < arguments.length; ++i) {
        pathTest(arguments[i]);
    }
}


// finders guaranteed to find the shortest path
pathTests( {
    name: 'BreadthFirst',
    finder: new PF.BreadthFirstFinder(),
    optimal: true
}, {
    name: 'Dijkstra',
    finder: new PF.DijkstraFinder(),
    optimal: true
}, {
    name: 'BiBreadthFirst',
    finder: new PF.BiBreadthFirstFinder(),
    optimal: true
}, {
    name: 'BiDijkstra',
    finder: new PF.BiDijkstraFinder(),
    optimal: true
});

  m  
