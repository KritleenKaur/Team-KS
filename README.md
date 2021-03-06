Project 1: NAVIGATE THE MARS ROVER
Helping the Mars Curiosity Rover find the shortest path between two points while avoiding obstacles on the way.

Submission by Team-KS for The Mars Colonization Program by Microsoft Engage 2020:
http://microsoft.acehacker.com/mars/

ALGORITHMS USED

Dijkstra’s Algorithm

Dijkstra’s Algorithm can be used to find the shortest path from the single given source to the given destination(s). 

The time complexity of this algorithm is O(V^2).

//Header Section

#include<iostream>
#include<stdio.h>
	
using namespace std;

#define INFINITY 9999
#define max 5

//Function Declaration

void dijkstra(int G[max][max],int n,int startnode);

//Main Function

int main() 
{
   int G[max][max]={{0,1,0,3,10},{1,0,5,0,0},{0,5,0,2,1},{3,0,2,0,6},{10,0,1,6,0}};
   int n=5;
   int u=0;
   dijkstra(G,n,u);
   return 0;
}

//Function Definition

void dijkstra(int G[max][max],int n,int startnode) 
{
   int cost[max][max],distance[max],pred[max];
   int visited[max],count,mindistance,nextnode,i,j;
   for(i=0;i<n;i++)
      for(j=0;j<n;j++)
   if(G[i][j]==0)
      cost[i][j]=INFINITY;
   else
      cost[i][j]=G[i][j];
   for(i=0;i<n;i++) {
      distance[i]=cost[startnode][i];
      pred[i]=startnode;
      visited[i]=0;
   }
   distance[startnode]=0;
   visited[startnode]=1;
   count=1;
   while(count<n-1) {
      mindistance=INFINITY;
      for(i=0;i<n;i++)
         if(distance[i]<mindistance&&!visited[i]) {
         mindistance=distance[i];
         nextnode=i;
      }
      visited[nextnode]=1;
      for(i=0;i<n;i++)
         if(!visited[i])
      if(mindistance+cost[nextnode][i]<distance[i]) {
         distance[i]=mindistance+cost[nextnode][i];
         pred[i]=nextnode;
      }
      count++;
   }
   for(i=0;i<n;i++)
   if(i!=startnode) {
      cout<<"\nDistance of node"<<i<<"="<<distance[i];
      cout<<"\nPath="<<i;
      j=i;
      do {
         j=pred[j];
         cout<<"<-"<<j;
      }while(j!=startnode);
   }
}

Flood Fill Algorithm - Grid Traversal Using Directions

//Header Section

#include<iostream>
#include<string>
#include<vector>

using namespace std;

//Functions

void flood ( int sr, int sc, vector<vector<int>>& maze, string& psf)
{
        if ( sr == maze.size()-1 && sc == maze[0].size()-1 )
        {
            cout << psf << endl;
            return;
        }

        maze[sr][sc] = 2;

        //t -> top
        if ( sr > 0 && maze[sr-1][sc] != 1 && maze[sr-1][sc] != 2 )
        {
          psf  += "t";
          flood ( sr-1, sc, maze, psf );
          psf.erase(psf.length() - 1, 1);
        }
        
        //l -> left
        if ( sc > 0 && maze[sr][sc-1] != 1 && maze[sr][sc-1] != 2 )
        {
          psf += "l";
          flood ( sr, sc-1, maze, psf);
          psf.erase(psf.length() - 1, 1);
        }

        //d -> down
        if ( sr < maze.size()-1 && maze[sr+1][sc] != 1 && maze[sr+1][sc] != 2 )
        {
          psf += "d";
          flood ( sr+1, sc, maze, psf );
          psf.erase(psf.length() - 1, 1);

        }
        
        //r -> right
        if ( sc < maze[0].size()-1 && maze[sr][sc+1] != 1 && maze[sr][sc+1] != 2 )
        {
           psf += "r";
          flood ( sr, sc+1, maze, psf );
          psf.erase(psf.length() - 1, 1);

        }

        maze[sr][sc] = 0;
}

//Main Function

int main( int argc, char** argv)
{
        vector<vector<int>> maze = {
                          {0, 1, 0, 0, 0, 0, 0, 1},
                          {0, 1, 0, 1, 1, 1, 0, 1},
                          {0, 1, 0, 1, 0, 0, 0, 1},
                          {0, 0, 0, 0, 0, 1, 1, 1},
                          {0, 1, 0, 1, 0, 0, 0, 0},
                          {0, 1, 0, 1, 1, 1, 1, 0},
                          {0, 1, 0, 1, 1, 1, 1, 0},
                          {0, 1, 0, 0, 0, 0, 0, 0} 
                        };
        string psf = "";
        flood( 0 , 0 , maze , psf );
}

Kruskal’s Algorithm

Kruskal’s Algorithm can be used to find the cost of a particular path of the Mars Rover. If multiple paths of the same length exist, that is the shortest path out of all possible paths the Rover can take, then the Rover can choose the path that has the minimum cost using this algorithm. 

The time complexity of this path is O(VlogV+ElogV).

Program: 

//Header Section

#include <bits/stdc++.h> 
using namespace std; 
  
class Edge  
{  
    public: 
    int src, dest, weight;  
};  
  
class Graph  
{  
    public: 
    // V-> Number of vertices, E-> Number of edges  
    int V, E;  
  
    Edge* edge;  
};  

Graph* createGraph(int V, int E)  
{  
    Graph* graph = new Graph;  
    graph->V = V;  
    graph->E = E;  
  
    graph->edge = new Edge[E];  
  
    return graph;  
}  
  
class subset  
{  
    public: 
    int parent;  
    int rank;  
};  

int find(subset subsets[], int i)  
{  
    if (subsets[i].parent != i)  
        subsets[i].parent = find(subsets, subsets[i].parent);  
  
    return subsets[i].parent;  
}  
void Union(subset subsets[], int x, int y)  
{  
    int xroot = find(subsets, x);  
    int yroot = find(subsets, y);  
    if (subsets[xroot].rank < subsets[yroot].rank)  
        subsets[xroot].parent = yroot;  
    else if (subsets[xroot].rank > subsets[yroot].rank)  
        subsets[yroot].parent = xroot;  
  
    else
    {  
        subsets[yroot].parent = xroot;  
        subsets[xroot].rank++;  
    }  
}  
  int myComp(const void* a, const void* b)  
{  
    Edge* a1 = (Edge*)a;  
    Edge* b1 = (Edge*)b;  
    return a1->weight > b1->weight;  
}  

//Functions
  
void KruskalMST(Graph* graph)  
{  
    int V = graph->V;  
    Edge result[V]; // Tnis will store the resultant MST  
    int e = 0; // An index variable, used for result[]  
    int i = 0; // An index variable, used for sorted edges  
  
    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), myComp);  
    subset *subsets = new subset[( V * sizeof(subset) )];  
    for (int v = 0; v < V; ++v)  
    {  
        subsets[v].parent = v;  
        subsets[v].rank = 0;  
    }  
    while (e < V - 1 && i < graph->E)  
    {  
        Edge next_edge = graph->edge[i++];  
  
        int x = find(subsets, next_edge.src);  
        int y = find(subsets, next_edge.dest);  
  
        if (x != y)  
        {  
            result[e++] = next_edge;  
            Union(subsets, x, y);  
        }  
        // Else discard the next_edge  
    }  
    cout<<"Following are the edges in the constructed MST\n";  
    for (i = 0; i < e; ++i)  
        cout<<result[i].src<<" -- "<<result[i].dest<<" == "<<result[i].weight<<endl;  
    return;  
}  
  
//Main Function
int main()  
{  
    /* Let us create following weighted graph  
            10  
        0--------1  
        | \ |  
    6| 5\ |15  
        | \ |  
        2--------3  
            4 */
    int V = 4; // Number of vertices in graph  
    int E = 5; // Number of edges in graph  
    Graph* graph = createGraph(V, E);  
  
  
    // add edge 0-1  
    graph->edge[0].src = 0;  
    graph->edge[0].dest = 1;  
    graph->edge[0].weight = 10;  
  
    // add edge 0-2  
    graph->edge[1].src = 0;  
    graph->edge[1].dest = 2;  
    graph->edge[1].weight = 6;  
  
    // add edge 0-3  
    graph->edge[2].src = 0;  
    graph->edge[2].dest = 3;  
    graph->edge[2].weight = 5;  
  
    // add edge 1-3  
    graph->edge[3].src = 1;  
    graph->edge[3].dest = 3;  
    graph->edge[3].weight = 15;  
  
    // add edge 2-3  
    graph->edge[4].src = 2;  
    graph->edge[4].dest = 3;  
    graph->edge[4].weight = 4;  
  
    KruskalMST(graph);  
  
    return 0;  
}  

Work Cited:
https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/

Prim’s Algorithm

Prim’s Algorithm can be used to find the cost of a particular path of the Mars Rover. If multiple paths of the same length exist, that is the shortest path out of all possible paths the Rover can take, then the Rover can choose the path that has the minimum cost using this algorithm. 

The time complexity of this path is O(VlogV+ElogV).

Program:

//Header Section

#include<iostream>
#include<vector>
#include<string>
#include<climits>
#include<queue>

using namespace std;

//Class

class Edge
{
    public:
    int nbr;
    int wt;
};

vector<vector<Edge>> graph;

//Functions

void addedge ( int v1, int v2, int wt)
{
    Edge e1;
    e1.nbr = v2;
    e1.wt = wt;
    graph[v1].push_back(e1);

    Edge e2;
    e2.nbr = v1;
    e2.wt = wt;
    graph[v2].push_back(e2);
}

void addedge(vector<vector<Edge>>& g, int v1, int v2, int wt)
{
    Edge e1;
    e1.nbr = v2;
    e1.wt = wt;
    g[v1].push_back(e1);

    Edge e2;
    e2.nbr = v1;
    e2.wt = wt;
    g[v2].push_back(e2);
}

//Class

class Ppair
{
    public:
    int v;
    int av;
    int c;

    Ppair ( int v, int av, int c)
    {
        this -> v = v;
        this -> av = av;
        this -> c = c;
    }

    bool operator<(const Ppair& other) const
    {
        return this -> c < other.c;
    }

    bool operator>(const Ppair& other) const
    {
        return this -> c > other.c;
    }
};

//Functions

void display ( vector<vector<Edge>>& g)
{
    for(int v = 0 ;  v < g.size() ; v++)
    {
        cout<< v << " -> ";
         for(int n=0; n < g[v].size() ; n++)
         {
             Edge ne = g[v][n];
             cout<< " [ "<<ne.nbr <<","<< ne.wt <<" ]";
         }
        cout<<"."<<endl;
    }
}

int counter =0;

void prims ()
{
    vector<vector<Edge>> mst (graph.size() , vector<Edge>());
    priority_queue< Ppair , vector<Ppair> , greater<Ppair>> pq;
    vector<bool> visited ( graph.size() , false);

    Ppair rtp (0 , -1 , 0);
    pq.push(rtp);

    while( pq.size() > 0 )
    {
      Ppair rem = pq.top();
      pq.pop();

      if(visited[rem.v] == true )
      {
        continue;
      }

      visited[rem.v] = true;
    
       
      if(rem.av  !=  -1 )
      {
        addedge(mst , rem.av, rem.v, rem.c);
      }

      for ( int n = 0 ; n < graph[rem.v].size() ; n++ )
      {
          Edge ne = graph[rem.v][n];
          if( visited[ne.nbr] == false)
          {
              Ppair np (ne.nbr , rem.v , ne.wt);
              pq.push(np);
          }
      }
    } 

    display ( mst );
}

//Main Function

int main( int argc, char** argv)
{
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    graph.push_back(vector<Edge>());
    
    addedge(0,1,20);
    addedge(1,2,10);
    addedge(2,3,20);
    addedge(0,3,40);
    addedge(3,4,2);
    addedge(4,5,3);
    addedge(5,6,3);
    addedge(4,6,8);
    
    display ( graph );
    
    cout << endl;
    
    prims ();
}

Breadth First Search Algorithm

Breadth First Search Algorithm can be used to find the path from a given source to a givn destination. Its time complexity is O(V+E).

Program:

//Header Section

#include<iostream> 
#include <list> 

using namespace std; 

//Class

class Graph 
{ 
	int V; // No. of vertices 

	list<int> *adj; 
public: 
	Graph(int V); // Constructor 

	void addEdge(int v, int w); 

	void BFS(int s); 
}; 

Graph::Graph(int V) 
{ 
	this->V = V; 
	adj = new list<int>[V]; 
} 

void Graph::addEdge(int v, int w) 
{ 
	adj[v].push_back(w); // Add w to v’s list. 
} 

void Graph::BFS(int s) 
{ 
	bool *visited = new bool[V]; 
	for(int i = 0; i < V; i++) 
		visited[i] = false; 

	list<int> queue; 

	visited[s] = true; 
	queue.push_back(s); 

	list<int>::iterator i; 

	while(!queue.empty()) 
	{ 
		s = queue.front(); 
		cout << s << " "; 
		queue.pop_front(); 

		for (i = adj[s].begin(); i != adj[s].end(); ++i) 
		{ 
			if (!visited[*i]) 
			{ 
				visited[*i] = true; 
				queue.push_back(*i); 
			} 
		} 
	} 
} 

//Main Function

int main() 
{ 
	Graph g(4); 
	g.addEdge(0, 1); 
	g.addEdge(0, 2); 
	g.addEdge(1, 2); 
	g.addEdge(2, 0); 
	g.addEdge(2, 3); 
	g.addEdge(3, 3); 

	cout << "Following is Breadth First Traversal "
		<< "(starting from vertex 2) \n"; 
	g.BFS(2); 

	return 0; 
} 

NEW IDEAS

Multiple Destinations 

If the Mars Curiosity Rover has to land on multiple destinations from the same source, we can use Dijkstra’s algorithm to find out the shortest route to each destination. 

We can also pass each destination in a given order until we reach the last destination. In this case, the current destination would become the source for the next destination. 

Multiple Sources

The Mars Curiosity Rover can choose among various sources and launch from the source that has the shortest path to the given destination. To find the shortest route to the destination, any algorithm can be used. 

Multiple Speeds 

The Mars Curiosity Rover can have multiple paths from a given source to a given destination. If we input the speed the Rover wants to travel with, the options can be slow, medium, or fast. We can calculate time using the inbuilt JavaScript function or add a timer to count iterations to the algorithm used to find the path. We can reroute the Rover to a longer or shorter path. Knowing the time and distance, we can calculate the speed and ensure that the Rover travels with the desired speed.

Refueling 

The Mars Curiosity Rover might need to stop for refueling breaks in between launching from and landing on multiple sources and destinations, or even refuel on the go. If it has a predetermined way of moving, say two steps forth and one step to the side like a Knight on a chessboard, we can use the Knight’s algorithm to find its trajectory. Similarly, the Mars Rover can move in a specific pattern like a particular chess piece on a chessboard. We can use all the algorithms involved in chess for this.

Submission by Team-KS

We express our gratitude for Microsoft Engage 2020 program. We're grateful for the webinars introducing Artificial Intelligence, Cloud Computing, Big Data, and more. This project is a small portion of our learnings from this mentorship program. Thank you Microsoft for this opportunity.
