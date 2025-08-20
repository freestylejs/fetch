import { f } from '@metal-box/fetch'
import { z } from 'zod'
import * as Model from './models'

export const api = f.router('https://api.example.com', {
    books: {
        GET: f
            .builder()
            .def_json()
            .def_response(async ({ json }) =>
                z.array(Model.Book).parse(await json())
            ),
        POST: f
            .builder()
            .def_json()
            .def_body(Model.BookRequest.parse)
            .def_response(async ({ json }) => Model.Book.parse(await json())),
        $id: {
            GET: f
                .builder()
                .def_json()
                .def_response(async ({ json }) =>
                    Model.Book.parse(await json())
                ),
        },
    },
})
