import { EmptyStateCard } from "../components/empty-state-card";
import { Skeleton } from "../components/ui/skeleton";
import { Package, Search, User, TrendingUp, Inbox } from "lucide-react";

export function LoadingStatesPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2">Loading & Empty States</h1>
          <p className="text-[#DADBE1]">Reusable skeleton loaders and empty state templates</p>
        </div>

        {/* Skeleton Loading States */}
        <section className="space-y-6">
          <div>
            <h2 className="mb-4">Skeleton Loaders</h2>
            <p className="text-[#DADBE1] mb-6">Used when content is loading</p>
          </div>

          {/* Creator Card Skeleton */}
          <div>
            <h3 className="mb-4 text-[#DADBE1]">Creator Card Loading</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <Skeleton className="w-full aspect-[3/4] bg-[#3A3C43]/20" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-[#3A3C43]/20" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-24 bg-[#3A3C43]/20" />
                      <Skeleton className="h-4 w-12 bg-[#3A3C43]/20" />
                    </div>
                    <Skeleton className="h-4 w-20 bg-[#3A3C43]/20" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full bg-[#3A3C43]/20" />
                      <Skeleton className="h-6 w-20 rounded-full bg-[#3A3C43]/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Card Skeleton */}
          <div>
            <h3 className="mb-4 text-[#DADBE1]">Dashboard Cards Loading</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 space-y-3">
                  <Skeleton className="h-4 w-24 bg-[#3A3C43]/20" />
                  <Skeleton className="h-10 w-20 bg-[#3A3C43]/20" />
                  <Skeleton className="h-3 w-16 bg-[#3A3C43]/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Order List Skeleton */}
          <div>
            <h3 className="mb-4 text-[#DADBE1]">Order List Loading</h3>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="flex gap-6">
                    <Skeleton className="w-20 h-20 rounded-xl bg-[#3A3C43]/20" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-40 bg-[#3A3C43]/20" />
                      <Skeleton className="h-4 w-32 bg-[#3A3C43]/20" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-24 bg-[#3A3C43]/20" />
                        <Skeleton className="h-4 w-24 bg-[#3A3C43]/20" />
                        <Skeleton className="h-4 w-16 bg-[#3A3C43]/20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Section Skeleton */}
          <div>
            <h3 className="mb-4 text-[#DADBE1]">Profile Section Loading</h3>
            <div className="glass-card rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-40 h-40 rounded-2xl bg-[#3A3C43]/20" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-48 bg-[#3A3C43]/20" />
                  <Skeleton className="h-4 w-full bg-[#3A3C43]/20" />
                  <Skeleton className="h-4 w-5/6 bg-[#3A3C43]/20" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-8 w-24 rounded-full bg-[#3A3C43]/20" />
                    <Skeleton className="h-8 w-20 rounded-full bg-[#3A3C43]/20" />
                    <Skeleton className="h-8 w-28 rounded-full bg-[#3A3C43]/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section className="space-y-12">
          <div>
            <h2 className="mb-4">Empty State Templates</h2>
            <p className="text-[#DADBE1] mb-6">Used when there's no content to display</p>
          </div>

          {/* No Orders */}
          <div className="glass-card rounded-2xl">
            <EmptyStateCard
              icon={Package}
              title="No orders yet"
              description="You haven't placed any orders yet. Browse our talented creators and make your first request!"
              actionLabel="Explore Creators"
              onAction={() => {}}
            />
          </div>

          {/* No Search Results */}
          <div className="glass-card rounded-2xl">
            <EmptyStateCard
              icon={Search}
              title="No results found"
              description="We couldn't find any creators matching your search. Try adjusting your filters or search terms."
              actionLabel="Clear Filters"
              onAction={() => {}}
            />
          </div>

          {/* Empty Category */}
          <div className="glass-card rounded-2xl">
            <EmptyStateCard
              icon={TrendingUp}
              title="No listings in this category yet"
              description="This category is new and growing. Check back soon for amazing creators!"
            />
          </div>

          {/* Empty Dashboard */}
          <div className="glass-card rounded-2xl">
            <EmptyStateCard
              icon={Inbox}
              title="Your dashboard is clear"
              description="Time to create something new! Upload your first listing and start earning."
              actionLabel="Create Listing"
              onAction={() => {}}
            />
          </div>

          {/* No Profile */}
          <div className="glass-card rounded-2xl">
            <EmptyStateCard
              icon={User}
              title="Complete your profile"
              description="Set up your creator profile to start accepting requests and building your audience."
              actionLabel="Complete Profile"
              onAction={() => {}}
            />
          </div>
        </section>

        {/* Usage Guide */}
        <section className="glass-card rounded-2xl p-8 space-y-6">
          <h2>Implementation Guide</h2>
          
          <div className="space-y-4 text-[#DADBE1]">
            <div>
              <h4 className="text-white mb-2">Skeleton Loading</h4>
              <p className="text-sm">
                Use <code className="px-2 py-1 bg-[#3A3C43]/50 rounded text-[#19E28C]">&lt;Skeleton /&gt;</code> from 
                shadcn/ui for loading states. Match the dimensions of the content being loaded.
              </p>
            </div>
            
            <div>
              <h4 className="text-white mb-2">Empty States</h4>
              <p className="text-sm">
                Use <code className="px-2 py-1 bg-[#3A3C43]/50 rounded text-[#19E28C]">&lt;EmptyStateCard /&gt;</code> component 
                with appropriate icon, title, description, and optional action button.
              </p>
            </div>
            
            <div>
              <h4 className="text-white mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                <li>Show skeletons immediately while data is loading</li>
                <li>Use empty states when arrays or lists are empty</li>
                <li>Provide helpful actions in empty states to guide users</li>
                <li>Keep empty state messages friendly and actionable</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
