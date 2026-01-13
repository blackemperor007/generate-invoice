import Image from "next/image";

export default function Logo() {
    return (
        <div>
            <Image
                src={"/logo.png"}
                alt="MoneTix App"
                width={70}
                height={50}
            />
        </div>
    )
}