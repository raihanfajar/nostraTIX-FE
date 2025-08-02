import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function RegisterOrganizerNoticeDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="destructive" className="bg-blue-500 animate-gradient-button"><Info /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] h-[90%] flex flex-col justify-between border border-[#2E5A61] bg-[#17326C]/40 backdrop-blur-md rounded-xl px-6 py-10 shadow-md space-y-4">
                    <DialogHeader>
                        <DialogTitle className="text-[#DDDEDF]">Organizer Notice</DialogTitle>
                        <DialogDescription>
                            <ul className="text-left p-4 list-decimal list-inside text-sm md:text-base space-y-3 font-lato text-[#DDDEDF] leading-relaxed">
                                <li>
                                    Fill out the <span className="font-semibold text-[#F5DFAD]">Organizer Registration</span> form.
                                </li>
                                <li>
                                    We will send a follow-up email to confirm your intent and gather further info.
                                </li>
                                <li>
                                    You&apos;ll be required to submit the following documents:
                                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
                                        <li>Valid ID of the person in charge (KTP/SIM/Passport)</li>
                                        <li>Legal entity docs (e.g., NIB, Akta, company profile)</li>
                                        <li>Event portfolio or past experience references</li>
                                    </ul>
                                </li>
                                <li>
                                    Once verified, you’ll get full access to our <span className="text-[#F5DFAD] font-medium">Organizer Dashboard</span> to publish events.
                                </li>
                                <li>
                                    Questions? Contact us at <span className="text-[#E67F3C] underline">support@nostratik.com</span>.
                                </li>
                            </ul>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">I Understand</Button>
                        </DialogClose>
                        {/* <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
