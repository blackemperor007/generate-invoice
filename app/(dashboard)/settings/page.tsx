"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import imagebase64 from "@/lib/imagebase64";
import { sign } from "crypto";
import Image from "next/image";
import { useState } from "react";

type TSignatureData = {
    name: string;
    image: string;
}

export default function SettingPage() {
  const [logo, setLogo] = useState<string>();
  const [signatureData, setSignatureData] = useState<TSignatureData>({
    name: "",
    image: "",
  });
//   handle signature name change here
  const onChangeSignature = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignatureData((preve) => {
        return {
            ...preve,
            [name]: value
        }
    })
  } 

//   handle signature image upload here
    const handleSignatureImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length < 0) return

    const file = files[0]

    // image to base64
    const image = await imagebase64(file)
    setSignatureData((preve) => {
        return {
            ...preve,
            image: image as string
        }
    })
}

    const handleOnChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length < 0) return;
    const file = files[0];
    // image to base64
    const image = await imagebase64(file);
    setLogo(image as string);
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="font-semibold text-xl">Paramètres</h1>
      </div>
      <Accordion type="multiple">
        {/* Invoice Logo */}
        <AccordionItem value="Invoice-Logo">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            Logo de facture
          </AccordionTrigger>
          <AccordionContent>
            <form className="w-full grid gap-2">
              <Input type="file" className="max-w-sm w-full" onChange={handleOnChangeLogo} />
              <div className="w-full max-w-xs">
                {logo ? (
                  <Image
                    className="aspect-video h-20 border-2 border-dotted max-h-20 object-scale-down"
                    src={logo}
                    width={250}
                    height={96}
                    alt="Logo de facture"
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex items-center justify-center rounded-lg ">
                    <p className="text-center text-muted-foreground">
                      Pas de logo sélectionné
                    </p>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-fit">
                Enregistrer
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>

        {/* Signature in invoice  */}
        <AccordionItem value="Signature-invoice">
          <AccordionTrigger className="font-semibold text-base cursor-pointer">
            {" "}
            Signature de la facture
          </AccordionTrigger>
          <AccordionContent>
            <form className="w-full grid gap-2">
                <Input
                    type="text"
                    placeholder="Nom de la signature"
                    value={signatureData.name}
                    onChange={onChangeSignature}
                    name="name"
                />
                <Input type="file" className="max-w-sm w-full" onChange={handleSignatureImage} />
                <div className="w-full max-w-xs">
                {signatureData.image ? (
                  <Image
                    className="aspect-video h-20 border-2 border-dotted max-h-20 object-scale-down"
                    src={signatureData.image}
                    width={250}
                    height={96}
                    alt="Signature de la facture"
                  />
                ) : (
                  <div className="aspect-video h-20 border-2 border-dotted flex items-center justify-center rounded-lg ">
                    <p className="text-center text-muted-foreground">
                      Pas d'image
                    </p>
                  </div>
                )}
              </div>
              <Button type="submit" className="w-fit">
                Enregistrer
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
