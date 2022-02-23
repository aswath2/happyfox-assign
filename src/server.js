/* eslint-disable array-callback-return */
import { createServer } from "miragejs";

let graphData = {
    "id": 1,
    "name": "Mark Hill",
    "designation": "Chief executive officer",
    "children": [],
    "hChildren": [
        {
            "id": 2,
            "name": "Joe Linux",
            "designation": "Chief Technology",
            "manager": 1,
            "children": [
                {
                    "id": 5,
                    "name": "Ron Blomquist",
                    "designation": "Chief Information",
                    "manager": 2,
                },
                {
                    "id": 6,
                    "name": "Michael Rubin",
                    "designation": "Chief Innovation officer",
                    "manager": 2,
                }
            ]
        },
        {
            "id": 3,
            "name": "Linda May",
            "designation": "Chief Business Officer",
            "manager": 1,
            "children": [
                {
                    "id": 7,
                    "name": "Alice Lopex",
                    "designation": "Chief Communication officer",
                    "manager": 3,
                },
                {
                    "id": 8,
                    "name": "Mary Johnson",
                    "designation": "Chief Brand officer",
                    "manager": 3,
                },
                {
                    "id": 9,
                    "name": "Krik Douglas",
                    "designation": "Chief Buisness",
                    "manager": 3,
                }
            ]
        },
        {
            "id": 4,
            "name": "John Green",
            "designation": "Chief Accounting officer",
            "manager": 1,
            "children": [
                {
                    "id": 10,
                    "name": "Erica Reel",
                    "designation": "Chief Customer Officer",
                    "manager": 4,
                }
            ]
        }
    ]
}

createServer({
    routes() {
        this.namespace = "api"

        this.get("/employee/graph", () => {
            return {
                data: graphData
            }
        }, [graphData])

        this.post("/employee/graph/edit", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            if (attrs.dropValue === graphData.id) {
                let tempData = {};
                graphData.hChildren.map((items) => {
                    items.children.map((item) => {
                        if (item.id === attrs.dragValue) {
                            item.manager = attrs.dropValue
                            tempData = item
                            items.children.splice(items.children.findIndex(a => a.id === attrs.dragValue), 1)
                            return tempData
                        }
                    })

                })
                graphData.children.push(tempData)
            } else {
                let tempData = {};
                if (graphData.children.length > 0) {
                    graphData.children.map((items) => {
                        if (items.id === attrs.dragValue) {
                            items.manager = attrs.dropValue
                            tempData = items
                            graphData.children.splice( graphData.children.findIndex(a => a.id === attrs.dragValue), 1)
                            return tempData
                        }
                    })
                }
                graphData.hChildren.map((items) => {

                    items.children.map((item) => {
                        if (item.id === attrs.dragValue) {
                            item.manager = attrs.dropValue
                            tempData = item
                            items.children.splice(items.children.findIndex(a => a.id === attrs.dragValue), 1)
                            return tempData
                        }
                    })


                })
                graphData.hChildren.map((value) => {
                    if (value.id === attrs.dropValue) {
                        value.children.push(tempData)
                    }
                })
            }
        })

        this.get("/employee", () => {
            return {
                data: [
                    { id: 1, name: "Mark Hill", designation: "Chief executive officer", team: "ceo" },
                    { id: 2, name: "Joe Linux", designation: "Chief Technology", team: "developer", manager: 1 },
                    { id: 3, name: "Linda May", designation: "Chief Business Officer", team: "sales", manager: 1 },
                    { id: 4, name: "John Green", designation: "Chief Accounting officer", team: "accounts", manager: 1 },
                    { id: 5, name: "Ron Blomquist", designation: "Chief Information", team: "developer", manager: 2 },
                    { id: 6, name: "Michael Rubin", designation: "Chief Innovation officer", team: "developer", manager: 2 },
                    { id: 7, name: "Alice Lopex", designation: "Chief Communication officer", team: "sales", manager: 3 },
                    { id: 8, name: "Mary Johnson", designation: "Chief Brand officer", team: "sales", manager: 3 },
                    { id: 9, name: "Krik Douglas", designation: "Chief Buisness", team: "sales", manager: 3 },
                    { id: 10, name: "Erica Reel", designation: "Chief Customer Officer", team: "accounts", manager: 4 },
                ],
            }
        })
    },
})