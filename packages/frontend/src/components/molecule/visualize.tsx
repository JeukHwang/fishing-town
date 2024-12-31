"use client";

import CategorySymbol from "@/components/atom/symbol";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { camelToTitleCase } from "@/lib/utils";
import {
  DefaultRule,
  RuleDiff,
  RuleEnglishDescription,
  RuleValidator,
  TownRule,
} from "@fishing-town/shared";
import { RotateCcw } from "lucide-react";
import React, { useState } from "react";

interface RuleProposalProps {
  initialTitle: string;
  initialDescription: string;
  oldRule: string;
  newRule: string;
  onConfirm: (title: string, description: string) => void;
  onCancel: () => void;
}

const RuleProposal: React.FC<RuleProposalProps> = ({
  initialTitle,
  initialDescription,
  oldRule,
  newRule,
  onConfirm,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const diffWords = (oldText: string, newText: string) => {
    const oldWords = oldText.split(" ");
    const newWords = newText.split(" ");
    const result: { text: string; type: "same" | "removed" | "added" }[] = [];

    let i = 0,
      j = 0;
    while (i < oldWords.length || j < newWords.length) {
      if (
        i < oldWords.length &&
        j < newWords.length &&
        oldWords[i] === newWords[j]
      ) {
        result.push({ text: oldWords[i], type: "same" });
        i++;
        j++;
      } else if (
        j < newWords.length &&
        (i >= oldWords.length || oldWords[i] !== newWords[j])
      ) {
        result.push({ text: newWords[j], type: "added" });
        j++;
      } else {
        result.push({ text: oldWords[i], type: "removed" });
        i++;
      }
    }

    return result;
  };

  const diff = diffWords(oldRule, newRule);

  const handleConfirm = () => {
    onConfirm(title, description);
    // setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    // setIsEditing(false);
    onCancel();
  };

  const initRule = () => DefaultRule.LeafTown();
  const [rule, setRule] = useState<TownRule>(initRule());

  const ruleDesc = RuleEnglishDescription.TownRule();
  const ruleDiff = Object.entries(
    RuleDiff.TownRule(
      DefaultRule.LeafTown(),
      DefaultRule.TurtleTown(10),
      "en",
      false
    )
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">New Rule Proposal</h2>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="text-2xl font-bold"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Rule</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(ruleDesc).map(([category, categoryValue]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <CategorySymbol category={category as keyof TownRule} />
                        {camelToTitleCase(category)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid w-full items-center gap-4">
                        {Object.entries(categoryValue).map(([key]) => {
                          return (
                            <RuleSetting
                              key={key}
                              title={camelToTitleCase(key)}
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                              desc={ruleDesc[category][key]}
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                              value={rule[category][key]}
                              onChange={(value) => {
                                const newRule = JSON.parse(
                                  JSON.stringify(rule)
                                ) as TownRule;
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                                newRule[category][key] = value;
                                if (RuleValidator.TownRule(newRule)) {
                                  console.log(`${category}.${key}: ${value}`);
                                  setRule(newRule);
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setRule(initRule());
                }}
              >
                <RotateCcw />
              </Button>{" "}
            </ScrollArea>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Proposed Rule</h3>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <p>
                {diff.map((word, index) => (
                  <span
                    key={index}
                    className={
                      word.type === "added"
                        ? "bg-green-200 dark:bg-green-900"
                        : word.type === "removed"
                        ? "bg-red-200 dark:bg-red-900 line-through"
                        : ""
                    }
                  >
                    {word.text}{" "}
                  </span>
                ))}
              </p>
            </ScrollArea>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Badge
            variant="outline"
            className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
          >
            Removed
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
          >
            Added
          </Badge>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RuleProposalVisualization() {
  const handleConfirm = (title: string, description: string) => {
    console.log("Confirmed:", { title, description });
    // Here you would typically send this data to your backend or perform some other action
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // Here you might want to reset the form or perform some other action
  };

  const longOldRule = `
    1. Respect: Members should be respectful in their interactions with others. This includes refraining from personal attacks, insults, or derogatory language.

    2. Content: All content shared must be appropriate for a general audience. Explicit, offensive, or inappropriate material is strictly prohibited.

    3. Spam: Do not spam the community with repetitive content, advertisements, or irrelevant information.

    4. Privacy: Respect the privacy of other members. Do not share personal information without explicit consent.

    5. Intellectual Property: Respect copyright laws and intellectual property rights. Only share content you have the right to distribute.

    6. Moderation: Comply with moderator decisions. If you disagree, use appropriate channels to appeal.

    7. Language: While English is the primary language of communication, be patient and understanding with non-native speakers.

    8. Constructive Criticism: When offering feedback, be constructive and respectful. Focus on the content, not the person.

    9. Off-Topic Discussions: Keep discussions relevant to the community's purpose. Use designated areas for off-topic conversations.

    10. Conflict Resolution: Attempt to resolve conflicts amicably. If unable to do so, seek assistance from moderators.
  `;

  const longNewRule = `
    1. Respect and Inclusivity: Members must maintain a respectful and inclusive tone in all community interactions, refraining from personal attacks, hate speech, or discriminatory language. Embrace diversity and foster an environment of mutual understanding.

    2. Content Appropriateness: All shared content must be suitable for a diverse, global audience. Explicit, offensive, or inappropriate material is strictly prohibited. Consider the potential impact of your content on others.

    3. Quality Contributions: Prioritize meaningful and relevant contributions. Avoid spamming, excessive self-promotion, or sharing irrelevant information that doesn't add value to the community.

    4. Privacy and Consent: Uphold the highest standards of privacy. Never share personal information without explicit, informed consent. Be mindful of the potential consequences of sharing information online.

    5. Intellectual Property Rights: Demonstrate utmost respect for copyright laws and intellectual property rights. Only share content you have the legal right to distribute, and always attribute sources appropriately.

    6. Constructive Engagement with Moderation: Respect and comply with moderator decisions. If you disagree, utilize appropriate appeal channels in a courteous and constructive manner. Remember that moderators are here to maintain a positive community environment.

    7. Language and Communication: While English serves as the primary language, exercise patience, understanding, and inclusivity towards non-native speakers. Encourage clear communication and be willing to clarify or rephrase when necessary.

    8. Constructive Feedback and Criticism: When offering feedback or criticism, focus on being constructive, specific, and respectful. Address the content or idea, not the individual. Aim to help others improve rather than to tear them down.

    9. Topical Relevance: Maintain the community's focus by keeping discussions relevant to its purpose. Utilize designated spaces for off-topic conversations, ensuring that the main discussions remain focused and valuable.

    10. Conflict Resolution and Community Harmony: Approach conflicts with a mindset of resolution and understanding. Attempt to resolve disagreements amicably through open, respectful dialogue. If unable to reach a resolution, seek assistance from moderators. Prioritize the overall harmony and positive atmosphere of the community.

    11. Digital Etiquette: Practice good digital etiquette. This includes using appropriate formatting, avoiding all caps (which can be perceived as shouting), and being mindful of tone in written communication.

    12. Reporting Violations: If you observe rule violations, report them to the moderation team through the appropriate channels. Avoid public callouts or engaging in vigilante moderation.

    13. Accessibility: When sharing content, consider accessibility. Use alt text for images, provide transcripts for audio when possible, and format your posts in a way that's easy to read and understand for all members.

    14. Fact-Checking and Misinformation: Before sharing information, especially on sensitive or controversial topics, verify its accuracy from reliable sources. Do not knowingly spread misinformation or unverified rumors.

    15. Evolving Rules: Understand that these rules may evolve as the community grows and changes. Stay informed about updates to the community guidelines and be prepared to adapt your behavior accordingly.
  `;

  return (
    <div className="p-4">
      <RuleProposal
        initialTitle="Community Guidelines Update: Comprehensive Rules for a Thriving Online Community"
        initialDescription="This proposal aims to expand and refine our community guidelines, fostering a more inclusive, respectful, and productive environment for all members."
        oldRule={longOldRule}
        newRule={longNewRule}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
