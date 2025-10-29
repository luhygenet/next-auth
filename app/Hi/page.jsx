"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

// ✅ Mock JSON data
const mockUser = {
  id: "u123",
  name: "AvaInfluencer",
  email: "ava@example.com",
  role: "influencer",
  verified: true,
  createdAt: "2024-06-01T10:00:00Z",
}

const mockInfluencerCollaborations = [
  {
    id: "c1",
    businessName: "Glow Skincare",
    campaignName: "Summer Radiance Campaign",
    budget: 500,
    status: "accepted",
  },
  {
    id: "c2",
    businessName: "FitFuel",
    campaignName: "New Year Fitness Push",
    budget: 700,
    status: "pending",
    message: "We’d love to collaborate on a January campaign!",
  },
  {
    id: "c3",
    businessName: "EcoBottle",
    campaignName: "Sustainable Living Drive",
    budget: 400,
    status: "accepted",
  },
]

const mockBusinesses = [
  {
    id: "b1",
    name: "Glow Skincare",
    avatar: "/placeholder.svg",
    bio: "Luxury vegan skincare brand promoting radiant skin.",
    followers: 42000,
    rating: 4.8,
  },
  {
    id: "b2",
    name: "FitFuel",
    avatar: "/placeholder.svg",
    bio: "Protein-rich snacks for active lifestyles.",
    followers: 58000,
    rating: 4.6,
  },
  {
    id: "b3",
    name: "EcoBottle",
    avatar: "/placeholder.svg",
    bio: "Eco-friendly water bottles that save the planet.",
    followers: 31000,
    rating: 4.9,
  },
]

export default function InfluencerDashboard() {
  // ✅ Simulate loading user data (mock)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setUser(mockUser)
    }, 500)
  }, [])

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted-foreground text-lg">Loading user data...</p>
      </div>
    )
  }

  // ✅ If user role check
  if (user.role !== "influencer") {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">This dashboard is for influencers only.</p>
      </div>
    )
  }

  // ✅ Mock filters
  const activeCollaborations = mockInfluencerCollaborations.filter((c) => c.status === "accepted")
  const pendingCollaborations = mockInfluencerCollaborations.filter((c) => c.status === "pending")

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 rounded-lg p-8 border border-primary/20">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome, {user.name}!
        </h1>
        <p className="text-muted-foreground mt-2">Manage your collaborations and grow your influence</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Collaborations", value: activeCollaborations.length },
          { label: "Total Earnings", value: "$1,200" },
          { label: "Pending Requests", value: pendingCollaborations.length },
          { label: "Completion Rate", value: "95%" },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="border-border p-6 bg-gradient-to-br from-background to-muted/30 hover:shadow-lg transition-shadow"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Active Collaborations */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Active Collaborations</h2>

        {activeCollaborations.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeCollaborations.map((collab) => (
              <Card
                key={collab.id}
                className="border-border p-6 bg-gradient-to-br from-background to-muted/20 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <h3 className="font-semibold text-foreground">{collab.businessName}</h3>
                <p className="text-sm text-muted-foreground mt-1">{collab.campaignName}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium text-foreground">${collab.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-accent capitalize">{collab.status}</span>
                  </div>
                </div>
                <Link href={`/dashboard/influencer/collaborations/${collab.id}`}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
                  >
                    View Details
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border p-6 text-center bg-gradient-to-br from-background to-muted/20">
            <p className="text-muted-foreground">No active collaborations yet</p>
          </Card>
        )}
      </div>

      {/* Pending Requests */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Collaboration Requests</h2>

        <div className="space-y-3">
          {pendingCollaborations.length > 0 ? (
            pendingCollaborations.map((request) => (
              <Card
                key={request.id}
                className="border-border p-4 flex items-center justify-between bg-gradient-to-r from-background to-muted/20 hover:border-primary/30 transition-all"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{request.businessName}</h3>
                  <p className="text-sm text-muted-foreground">{request.campaignName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{request.message}</p>
                  <p className="text-sm font-medium text-accent mt-2">Budget: ${request.budget}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    Decline
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="border-border p-6 text-center bg-gradient-to-br from-background to-muted/20">
              <p className="text-muted-foreground">No pending requests</p>
            </Card>
          )}
        </div>
      </div>

      {/* Browse Businesses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Browse Businesses</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockBusinesses.map((business) => (
            <Card
              key={business.id}
              className="border-border overflow-hidden bg-gradient-to-br from-background to-muted/20 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={business.avatar || "/placeholder.svg"}
                    alt={business.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{business.name}</h3>
                    <p className="text-xs bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
                      Verified
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{business.bio}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="font-medium text-foreground">{(business.followers / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="font-medium text-foreground">{business.rating}/5</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white font-medium">
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
