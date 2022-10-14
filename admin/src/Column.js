import {
    useMemo
} from "react"


export default function Column() {

    const ColumnStaff = useMemo(() => [{
            field: "Image",
            header: "Avatar",
            width: 60
        }, {
            field: "Name",
            header: "Name",
            width: 150
        }, {
            field: "Telephone",
            header: "Telephone",
            width: 100
        }, {
            field: "Email",
            header: "Email",
            width: 150
        }, {
            field: "Gender",
            header: "Gender",
            width: 60
        }, {
            field: "Birthday",
            header: "Birthday",
            width: 100
        }, {
            field: "Number",
            header: "Number",
            width: 60
        }, {
            field: "Street",
            header: "Street",
            width: 60
        },
        {
            field: "District",
            header: "District",
            width: 60
        },
        {
            field: "City",
            header: "City",
            width: 60
        },
    ], [])

}