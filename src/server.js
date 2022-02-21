import { createServer } from "miragejs"

createServer({
    routes() {
        this.namespace = "api"

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