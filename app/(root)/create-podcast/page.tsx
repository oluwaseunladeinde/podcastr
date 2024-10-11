"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { VOICE_CATEGORIES } from "@/constants";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/generate-podcast";
import GenerateThumbnail from "@/components/generate-thumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    podcastTitle: z.string().min(2),
    podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
    const [imagePrompt, setImagePrompt] = useState('');
    const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const [audioUrl, setAudioUrl] = useState<string>('');
    const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null);
    const [audioDuration, setAudioDuration] = useState<number>(0);

    const [voicePrompt, setVoicePrompt] = useState('');
    const [voiceType, setVoiceType] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: "",
            podcastDescription: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section className="mt-10 flex flex-col">
            <h1 className='text-20 font-bold text-white-1'>Create Podcast</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex flex-col w-full">
                    <div className="flex flex-col gap-[30px] border-b border-back-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                                    <FormControl>
                                        <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="JSM Pro Podcast" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>
                            <Select onValueChange={(value) => setVoiceType(value)}>
                                <SelectTrigger className={cn(
                                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1",
                                )}>
                                    <SelectValue placeholder="Select AI voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="text-16 font-bold text-white-1 border-none bg-black-1 focus:ring-orange-1">
                                    {VOICE_CATEGORIES.map((category) => (
                                        <SelectItem value={category.name} key={category.id} className="capitalize focus:bg-orange-1">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                {voiceType && (
                                    <audio src={`/sounds/${voiceType}.mp3`} autoPlay className="hidden" />
                                )}
                            </Select>

                        </div>
                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5 ">
                                    <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a short podcast description" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col pt-10 ">
                        <GeneratePodcast
                            setAudioStorageId={setAudioStorageId}
                            setAudio={setAudioUrl}
                            voiceType={voiceType!}
                            setAudioDuration={setAudioDuration}
                            audio={audioUrl}
                            voicePrompt={voicePrompt}
                            setVoicePrompt={setVoicePrompt}
                        />
                        <GenerateThumbnail />
                        <div className="mt-10 w-full">
                            <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1">
                                {isSubmitting ? (
                                    <>
                                        Submitting...
                                        <Loader size={20} className="animate-spin ml-2" />
                                    </>
                                ) : "Submit & Publish Podcast"}
                            </Button>

                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CreatePodcast