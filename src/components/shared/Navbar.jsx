import React from "react";
import {Popover, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PopoverContent} from "@radix-ui/react-popover";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {LogOut, User2} from "lucide-react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='bg-blue-400'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Kit<span className='text-[#F83002]'>Kat</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Create a new Post</li>
                        <Link to='/addPost'><Button variant='outline'>Create a new Post</Button></Link>
                        <Link to='/login'><Button variant='outline'>Sign in</Button></Link>
                        <Link to='/register'><Button variant='outline'>Register</Button></Link>
                    </ul>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div>
                                <div className='flex gap-2 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>Admin</h4>
                                        <p className='text-sm text-muted-foreground'>Testing text</p>
                                    </div>
                                </div>
                                <div className='flex flex-col text-gray-600'>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2/>
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut/>
                                        <Button variant="link">Logout</Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Navbar;