import {Schema, model, Document} from 'mongoose';

export interface IBook extends Document{
    title: string;
    author: string;
    year: number;
    description: string;
    url: string;
}

const bookSchema = new Schema<IBook>({
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true}
});

export default model("Book", bookSchema);