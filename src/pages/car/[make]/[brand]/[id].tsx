import { openDB } from "../../../../openDB";
import { GetServerSideProps } from "next";
import { CarModel } from "../../../../../api/Car";


interface CarDetailsProps {
    car: CarModel | null | undefined;
}

export default function CarDetauks({car}: CarDetailsProps) {
    if(!car) {
        return <h1> Sorry, whatever you're serching for cannot be found</h1>
    }
    return <div>{JSON.stringify(car, null, 4)}</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.params.id;
    const db = await openDB();
    const car = await db.get<CarModel | undefined>(
        'SELECT * FROM Car where id =?', id);
    return {props: {car: car || null}};
}