import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Calendar, MapPin, ArrowUpRight, ArrowDownRight, Phone as PhoneIcon, Mail as MailIcon, Calendar as CalendarIcon, FileText } from 'lucide-react'

interface ClientInfoCardProps {
    client: {
        avatar: string
        name: string
        initials: string
        occupation: string
        riskProfile: string
        clientSince: string
        email: string
        phone: string
        address: string
        nextMeeting: string
        portfolioValue: string
        change: string
        positive: boolean
        lastContact: string
    }
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
    return (
        <Card className="sticky top-[20px] w-full md:w-[400px]">
            <CardContent className="pt-6">
                <div className="mb-6 flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-24 w-24">
                        <AvatarImage
                            src={client.avatar}
                            alt={client.name}
                        />
                        <AvatarFallback>{client.initials}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{client.name}</h2>
                    <p className="text-muted-foreground">{client.occupation}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="px-3 py-1"
                        >
                            {client.riskProfile} Risk Profile
                        </Badge>
                        <Badge
                            variant="outline"
                            className="px-3 py-1"
                        >
                            Client since {client.clientSince}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">{client.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">{client.phone}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">{client.address}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">Next Meeting: {client.nextMeeting}</div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-6">
                    <h3 className="mb-4 font-medium">Portfolio Summary</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Current Value</span>
                            <span className="font-medium">{client.portfolioValue}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">YTD Performance</span>
                            <div className="flex items-center gap-1">
                                {client.positive ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                                <span className={client.positive ? 'text-emerald-500' : 'text-red-500'}>{client.change}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Last Contact</span>
                            <span>{client.lastContact}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t pt-6">
                    <h3 className="mb-4 font-medium">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <PhoneIcon className="h-4 w-4" />
                            Call
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <MailIcon className="h-4 w-4" />
                            Email
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <CalendarIcon className="h-4 w-4" />
                            Schedule
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            <FileText className="h-4 w-4" />
                            Documents
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
