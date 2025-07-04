import Shop from "@/lib/shopModel"

const ShopsList = ({ shops }: { shops: Shop[] }) => {
    return (
        <ul>
            {shops.map((shop: Shop) => (
                <li key={shop.id}>{shop.name} - {shop.location}</li>
            ))}
        </ul>
    )
}
export default ShopsList