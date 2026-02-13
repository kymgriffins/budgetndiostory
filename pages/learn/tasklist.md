this to be in a lesson 
          {/* BUDGET CALENDAR */}
          <section id="calendar" className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Kenya Budget Calendar
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Key dates in the annual budget cycle
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {budgetCalendarEvents.map((event, index) => (
                  <motion.div
                    key={event.month}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                        event.phase === "announcement"
                          ? "bg-[#00aa55]/20 text-[#00aa55]"
                          : event.phase === "participation"
                            ? "bg-blue-500/20 text-blue-400"
                            : event.phase === "approval"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Calendar size={20} />
                    </div>
                    <p className="text-xs font-NeueMontreal text-[#00aa55] uppercase tracking-wider">
                      {event.month}
                    </p>
                    <p className="font-FoundersGrotesk text-sm mt-1">
                      {event.event}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#00aa55]/10 to-blue-500/10 border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00aa55]/20 flex items-center justify-center">
                    <LinkIcon size={20} className="text-[#00aa55]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-FoundersGrotesk font-medium">
                      Want reminders?
                    </p>
                    <p className="text-sm font-NeueMontreal text-white/60">
                      Subscribe to get notified about upcoming budget events
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-[#00aa55] text-black rounded-lg text-sm font-NeueMontreal font-medium hover:bg-[#00cc66] transition-colors">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </section>


          