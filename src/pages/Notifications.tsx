
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Users, Calendar, Zap, MessageCircle } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Power Cut Alert",
      message: "Scheduled power cut in your area from 10 AM to 2 PM",
      time: "2 hours ago",
      icon: "🔌",
      color: "bg-red-100 text-red-700",
      unread: true
    },
    {
      id: 2,
      type: "event",
      title: "Community Meeting",
      message: "Monthly community meeting scheduled for this Saturday",
      time: "5 hours ago",
      icon: "🎉",
      color: "bg-blue-100 text-blue-700",
      unread: true
    },
    {
      id: 3,
      type: "scheme",
      title: "New Government Scheme",
      message: "Solar panel subsidy scheme now available in your area",
      time: "1 day ago",
      icon: "🎁",
      color: "bg-green-100 text-green-700",
      unread: false
    },
    {
      id: 4,
      type: "weather",
      title: "Weather Alert",
      message: "Heavy rainfall expected in your area tomorrow",
      time: "1 day ago",
      icon: "🌦️",
      color: "bg-orange-100 text-orange-700",
      unread: false
    },
    {
      id: 5,
      type: "comment",
      title: "New Comment",
      message: "Someone commented on your post about local market",
      time: "2 days ago",
      icon: "💬",
      color: "bg-purple-100 text-purple-700",
      unread: false
    }
  ];

  const groupedNotifications = {
    today: notifications.filter(n => n.time.includes('hours ago')),
    thisWeek: notifications.filter(n => n.time.includes('day ago')),
    earlier: notifications.filter(n => n.time.includes('days ago'))
  };

  const handleNotificationClick = (notification: any) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'comment':
        // Navigate to the post with comments
        window.location.href = `/post/${notification.id}`;
        break;
      case 'alert':
      case 'event':
      case 'scheme':
      case 'weather':
        // Navigate to relevant page or show details
        window.location.href = `/`;
        break;
      default:
        break;
    }
  };

  const NotificationItem = ({ notification }: { notification: any }) => (
    <Card 
      onClick={() => handleNotificationClick(notification)}
      className={`mb-3 border-l-4 ${notification.unread ? 'border-l-primary shadow-md' : 'border-l-border'} hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-card border-border`}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-full bg-muted text-lg">
            {notification.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{notification.title}</h3>
              {notification.unread && (
                <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                  New
                </Badge>
              )}
            </div>
            <p className="text-foreground text-sm mt-1">{notification.message}</p>
            <p className="text-muted-foreground text-xs mt-2">{notification.time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Notifications
          </h1>
          <Bell className="h-6 w-6 text-primary" />
        </div>

        {groupedNotifications.today.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Today</h2>
            {groupedNotifications.today.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}

        {groupedNotifications.thisWeek.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">This Week</h2>
            {groupedNotifications.thisWeek.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}

        {groupedNotifications.earlier.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Earlier</h2>
            {groupedNotifications.earlier.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">Stay tuned for community updates!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
