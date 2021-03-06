package com.codesquad.issuetracker.label.domain;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class Label {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)", name = "LABEL_ID")
    private UUID id;

    @NonNull
    @Column(name = "LABEL_NAME", unique = true, length = 50, nullable = false)
    private String name;

    @NonNull
    @Column(name = "LABEL_DESCRIPTION", length = 100, nullable = false)
    private String description;

    @NonNull
    @Embedded
    private Colors colors;

    public static Label create(String name, String description, Colors colors) {
        checkName(name);
        checkDescription(description);
        checkColors(colors);

        return new Label(name, description, colors);
    }

    private static void checkName(String name) {
        if (name == null || name.length() == 0) {
            throw new IllegalArgumentException("Label name is empty or null");
        }

        if (name.length() > 50) {
            throw new IllegalArgumentException("Label name is too long (max 50)");
        }
    }

    private static void checkDescription(String description) {
        if (description != null && description.length() > 100) {
            throw new IllegalArgumentException("Label description is too long (max 100)");
        }
    }

    private static void checkColors(Colors colors) {
        if (colors == null) {
            throw new IllegalArgumentException("Colors is null");
        }
    }

    public void update(Label newInfoLabel) {
        this.name = newInfoLabel.name;
        this.description = newInfoLabel.description;
        this.colors = newInfoLabel.colors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Label label = (Label) o;
        return id.equals(label.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
