import { Link } from '@inertiajs/react';
import { ClipboardCheck } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-bg-input font-body">
            {/* Same navy header language as the dashboard */}
            <div className="bg-navy-deep">
                <div className="max-w-6xl mx-auto px-8 py-5">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-icon bg-action-blue flex items-center justify-center">
                            <ClipboardCheck size={17} className="text-white" />
                        </span>
                        <span className="text-white font-display font-semibold text-[17px]">
                            Carteira Digital
                        </span>
                    </Link>
                </div>
            </div>

            {/* Centered card */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-card shadow-card p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
